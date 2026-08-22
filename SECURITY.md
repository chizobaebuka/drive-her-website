# Security

This document records the security posture of the DriveHer website: what is
implemented, why, and what to change if the site's requirements change.

## Reporting a vulnerability

Email **info@driveher.ng** with the subject line `SECURITY`. Please include
steps to reproduce. Do not open a public issue.

---

## Threat model

The site is a **static marketing site with one write endpoint**. It stores no
user accounts, holds no session, renders no user-generated content, and has no
database. That shapes everything below: the realistic risks are form abuse
(spam, mailbox flooding, injection into downstream systems), transport
downgrade, clickjacking, and supply-chain issues — not authenticated session
attacks.

---

## HTTP response headers

Set in `next.config.ts` and applied to every route.

| Header | Value | Why |
| --- | --- | --- |
| `Content-Security-Policy` | see below | Restricts where code, styles, images, fonts and connections may come from |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Forces HTTPS for two years, including subdomains |
| `X-Content-Type-Options` | `nosniff` | Stops MIME-type sniffing |
| `X-Frame-Options` | `DENY` | Legacy clickjacking protection |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | No path or query leaked to third parties |
| `Permissions-Policy` | camera, microphone, geolocation etc. all `()` | Disables powerful APIs the site never uses |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolates the browsing context |
| `Cross-Origin-Resource-Policy` | `same-origin` | Prevents cross-origin embedding of our resources |
| `Origin-Agent-Cluster` | `?1` | Requests origin-keyed agent clustering |
| `X-Powered-By` | *removed* | No framework fingerprint |

Verify after deployment:

```bash
curl -sI https://driveher.ng | grep -iE 'content-security|strict-transport|x-frame|permissions-policy'
```

## Content Security Policy

```
default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none';
form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self';
manifest-src 'self'; media-src 'self'; worker-src 'self' blob:; upgrade-insecure-requests
```

**Note on `'unsafe-inline'` in `script-src`.** Next.js inlines its own
hydration payload into the document. Removing that allowance requires a
per-request nonce, which forces every page to render dynamically and gives up
CDN caching — a real cost for a marketing site whose 20 pages are otherwise
fully static.

That allowance is only dangerous if an attacker can get a string into the page.
On this site they cannot:

- No user-generated content is rendered anywhere.
- No third-party scripts, tags, widgets or embeds are loaded.
- `dangerouslySetInnerHTML` appears in exactly one place —
  `src/components/seo/JsonLd.tsx` — where the payload is produced by our own
  code, serialised with `JSON.stringify` and has `<` escaped so a value can
  never terminate the script element.
- Everything else goes through React, which escapes by default.
- `object-src 'none'`, `base-uri 'self'` and `frame-ancestors 'none'` close the
  usual escalation paths.

**If you add user-generated content, a CMS, comments, or third-party
analytics, switch to nonce mode.** Add `src/middleware.ts`:

```ts
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  const headers = new Headers(request.headers);
  headers.set('x-nonce', nonce);
  headers.set('content-security-policy', csp);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set('content-security-policy', csp);
  return response;
}

export const config = {
  matcher: [
    { source: '/((?!api|_next/static|_next/image|favicon.ico).*)', missing: [{ type: 'header', key: 'next-router-prefetch' }] },
  ],
};
```

Then remove the `Content-Security-Policy` entry from `next.config.ts` so the
two do not conflict, and accept that pages become dynamically rendered.

---

## The lead-capture endpoint

`POST /api/leads` — `src/app/api/leads/route.ts`. Layered controls, in the
order they run:

1. **Origin check.** The `Origin` header is compared against the host the
   browser actually connected to, plus `NEXT_PUBLIC_SITE_URL` and any
   `ALLOWED_ORIGINS`. Cross-site posts get `403`.
2. **Content type check.** Only `application/json` is accepted, which rejects
   the simple-request forms (`multipart/form-data`,
   `application/x-www-form-urlencoded`, `text/plain`) that a classic CSRF form
   would use — those are the only content types a cross-origin form can send
   without a preflight.
3. **Rate limit.** 5 submissions per IP per 10 minutes, fixed window, with a
   `Retry-After` header on `429`. Runs before any parsing so a flood is cheap
   to refuse.
4. **Bounded read.** `Content-Length` and the decoded body are both capped at
   16 KB; anything larger gets `413`.
5. **Schema validation.** Zod (`src/lib/validation.ts`): every field is length
   bounded, `interest` is a closed enum (not free text), the phone field is
   pattern restricted, control characters are rejected, and consent must be
   literally `true`. Unknown keys are stripped rather than forwarded.
6. **Silent bot checks.** A honeypot field (`company`) and a minimum
   time-on-form (2.5 s). Both deliberately **pass schema validation** and
   return the same `{ok:true}` shape as a success — a bot cannot learn from the
   response which signal caught it. The message is simply never delivered.
7. **Delivery.** Plain-text email or webhook only. No HTML email body is ever
   constructed, so no submitted string is interpolated into markup anywhere in
   the pipeline. Both transports have an 8-second `AbortController` timeout.
8. **Error handling.** Transport failures are logged server-side; the client
   receives a generic message. API keys, hostnames and stack traces are never
   returned to the browser.

Run the smoke test against a local server:

```bash
npm run build && npm start
BASE=http://localhost:3000 ./scripts/api-smoke.sh
```

### Rate limiting at scale

`src/lib/rate-limit.ts` is in-memory and therefore **per instance**. On a single
Node server that is sufficient. On a horizontally scaled or serverless platform
each instance keeps its own counter, so the effective limit is
`5 × instance count`. If that matters, swap the store for Redis — the `rateLimit()`
signature is designed to stay identical:

```ts
// Sketch using @upstash/ratelimit
const limiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '10 m'),
});
const { success, reset } = await limiter.limit(`leads:${ip}`);
```

### Client IP

`clientIp()` reads `cf-connecting-ip`, `x-real-ip`, then the first hop of
`x-forwarded-for`, and **validates the value looks like an IP** so a spoofed
header cannot poison the bucket key with arbitrary text. Behind a proxy that
sets none of them, all traffic shares one `unknown` bucket — which fails
strict, not loose.

---

## Data protection

- Only name, email, and the optional phone, organisation, location and message
  are collected. No cookies are set: no advertising, analytics or tracking
  cookies exist on the site.
- IP and user agent are recorded with a submission solely for abuse detection.
- The privacy notice at `/legal/privacy` states retention (24 months) and the
  rights available under the Nigeria Data Protection Act 2023.
- `.gitignore` excludes `.env*`, `/.data/` and `leads.log` so captured personal
  data cannot be committed accidentally.

---

## Supply chain

- `npm audit` reports **0 vulnerabilities** at the pinned versions.
- Next.js is pinned to a patched `15.5.x` release.
- `overrides` in `package.json` force patched `sharp` and `postcss` up through
  transitive dependencies.
- Runtime dependencies are deliberately minimal: `next`, `react`, `react-dom`,
  `zod`. No UI kit, no analytics SDK, no icon package — every icon is inline
  SVG written in this repository.
- Fonts are **self-hosted** (`src/fonts/`), so no request ever goes to Google
  Fonts and `font-src` stays `'self'`.
- `next.config.ts` sets `images.remotePatterns: []`, so the image optimiser
  cannot be pointed at an arbitrary host — closing that SSRF class outright.
  `dangerouslyAllowSVG` is off.

Re-check before each deploy:

```bash
npm audit --omit=dev
npm outdated
```

---

## Deployment checklist

- [ ] `NEXT_PUBLIC_SITE_URL` set to the real origin, no trailing slash
- [ ] `NEXT_PUBLIC_SITE_ENV=production` on the live site **only**
- [ ] A lead transport configured (`RESEND_API_KEY` or `LEAD_WEBHOOK_URL`)
- [ ] TLS terminated with HTTP → HTTPS redirect at the edge
- [ ] Response headers verified with `curl -sI`
- [ ] `https://driveher.ng/robots.txt` allows crawling; staging disallows it
- [ ] Sitemap submitted in Google Search Console
- [ ] `./scripts/api-smoke.sh` passes against the deployed origin
- [ ] Domain has SPF, DKIM and DMARC records if sending via Resend
