# DriveHer — corporate website

The public website for **DriveHer Urban Mobility Services Limited**: a
conversion-focused corporate site covering the group, the Bayelsa (BWGMI) and
Delta (DWCMI) programmes, the investment case, the partnership framework and
driver recruitment.

Built with Next.js 15 (App Router), TypeScript and Tailwind CSS v4. Twenty
routes, all statically generated except the one lead-capture API route.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # then fill in the values you need
npm run dev                    # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (fails on type or lint errors) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `./scripts/api-smoke.sh` | 11-case security smoke test for `/api/leads` |

Requires Node 20 or newer.

---

## Project structure

```
src/
├── app/                        # App Router: one folder per route
│   ├── layout.tsx              # Shell, fonts, Organization + WebSite JSON-LD
│   ├── page.tsx                # Home
│   ├── programmes/             # Index, /bayelsa, /delta
│   ├── ecosystem/              # Eight business lines, tech stack, pricing policy
│   ├── women/                  # Empowerment framework + DriveHer Academy
│   ├── drive-with-us/          # Driver recruitment + application form
│   ├── investors/              # Pre-seed round + deck request form
│   ├── partners/               # PPP framework + partnership form
│   ├── impact/                 # Economic / social / environmental + governance
│   ├── about/, contact/, legal/
│   ├── api/leads/route.ts      # The only server endpoint
│   ├── sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
│   └── globals.css             # Design tokens + base + utilities
├── components/
│   ├── forms/LeadForm.tsx      # Single form component used by every page
│   ├── marketing/              # Hero, PageHero, StatBand, Faq, CtaBanner, …
│   ├── seo/JsonLd.tsx
│   ├── site/                   # Header, Footer, Logo, MobileCtaBar
│   └── ui/                     # Button, Card, Section primitives
├── fonts/                      # Self-hosted woff2 (latin subset)
└── lib/
    ├── content.ts              # ALL programme copy, as data
    ├── site.ts                 # Identity, navigation, contact details
    ├── seo.ts                  # Metadata builder + JSON-LD schemas
    ├── validation.ts           # Zod schema for lead submissions
    ├── rate-limit.ts, mailer.ts, fonts.ts, utils.ts
```

### Where to edit what

| To change… | Edit |
| --- | --- |
| Programme copy, statistics, FAQ answers | `src/lib/content.ts` |
| Company name, phone, email, navigation | `src/lib/site.ts` |
| Page title / meta description | the `pageMetadata({...})` call at the top of that page |
| Brand colours, spacing, type scale | the `@theme` block in `src/app/globals.css` |
| Where form submissions go | `.env.local` — see `.env.example` |
| A new route in the sitemap | `src/app/sitemap.ts` |

Content is deliberately stored as plain data in `src/lib/content.ts` rather
than inline JSX, so it can be reviewed by non-engineers and moved to a CMS
later without touching layout.

---

## Conversion design

Four audiences are served by distinct routes, each ending in a form:

| Audience | Route | Action |
| --- | --- | --- |
| Investors | `/investors` | Request the pre-seed deck |
| Government & PPP | `/partners` | Open a partnership conversation |
| Women drivers | `/drive-with-us` | Apply to drive |
| Riders & corporates | `/contact?interest=corporate` | Request a quote |

Supporting mechanics:

- An audience router immediately below the hero on the home page.
- A persistent mobile action bar that appears after 700 px of scroll and hides
  itself on `/contact` so it never covers a submit button.
- A conversion band in the footer, so every page ends on an action.
- One `LeadForm` component throughout, with `?interest=` deep-linking that
  preselects the enquiry type — so a CTA lands on a form already set to the
  right context.
- Concrete numbers (`₦7.5M`, `1,500+`, `500 kWh`) used as proof, with a
  standing disclaimer that programme figures are planning targets.

---

## SEO

- Per-page canonical URL, title, description, OpenGraph and Twitter card via
  the shared `pageMetadata()` builder — no route can silently ship without them.
- JSON-LD: `Organization` and `WebSite` site-wide; `BreadcrumbList` and
  `Service` on programme pages; `FAQPage` on the home and driver pages;
  `ContactPage` with `ContactPoint` on contact.
- `sitemap.xml` with per-route priority and change frequency; `robots.txt` that
  **disallows everything unless `NEXT_PUBLIC_SITE_ENV=production`**, so staging
  and preview deployments cannot be indexed.
- Generated 1200×630 OpenGraph image at `/opengraph-image`.
- Semantic landmarks, one `<h1>` per page, breadcrumbs on every interior page,
  descriptive alt text on every image, and permanent redirects for the short
  URLs people actually type (`/invest`, `/bayelsa`, `/delta`, `/drivers`).

## Performance

- 20 of 21 routes are statically prerendered; first-load JS is 103–129 kB.
- Fonts self-hosted, latin subset only, with metric-matched fallbacks so
  cumulative layout shift stays at zero.
- AVIF/WebP image pipeline; the hero image is `priority`, everything else lazy.
- Long-lived immutable caching for build assets, 30-day caching for images.
- No client-side JavaScript beyond the header, the mobile bar and the form.
  The FAQ accordions are native `<details>` and work with JS disabled.
- Scroll reveals use CSS scroll-driven animations and are removed entirely
  under `prefers-reduced-motion`.

## Accessibility

Audited with axe-core (WCAG 2.1 A/AA plus best-practice) across all twelve
content pages: **0 violations**.

- All text meets AA contrast on both the white and canvas backgrounds.
- Skip link, visible focus rings, correct heading order, real `<dl>` markup for
  statistics, labelled form fields with `aria-invalid` and `aria-describedby`.
- Keyboard-operable navigation with Escape to close; body scroll locked while
  the mobile drawer is open.
- No horizontal overflow at 390 px.

## Security

Strict CSP, HSTS, `X-Frame-Options: DENY`, a locked-down `Permissions-Policy`,
and a lead endpoint with origin checking, rate limiting, bounded body reads,
Zod validation and silent bot traps. `npm audit`: 0 vulnerabilities.

**See [SECURITY.md](./SECURITY.md)** for the full posture, the reasoning behind
the CSP, how to move to nonce mode, and the deployment checklist.

---

## Deployment

The app is a standard Next.js server build and runs anywhere Node 20+ runs —
Vercel, Netlify, Render, Fly, a container, or a VPS behind Nginx.

1. Set the environment variables from `.env.example`.
2. Build: `npm ci && npm run build`.
3. Serve: `npm start` (or your platform's Next.js runtime).
4. Work through the checklist at the end of `SECURITY.md`.

Because `/api/leads` is a server route, a fully static export (`output:
'export'`) is not possible without replacing the form transport.

---

## Content sources

All programme copy is drawn from DriveHer's own documents:

- Bayelsa Women Green Mobility Initiative (BWGMI) PPP proposal
- Delta Women Clean Mobility Initiative (DWCMI) programme brief
- DriveHer pre-seed investor pitch deck
- DriveHer platform pricing and commission policy

Figures presented on the site are planning targets from those documents, not
forecasts. The disclaimer in the footer and in `/legal/terms` states this.

---

© DriveHer Urban Mobility Services Limited. All rights reserved.
# drive-her-website
