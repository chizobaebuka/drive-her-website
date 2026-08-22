import { NextResponse } from 'next/server';
import { deliverLead } from '@/lib/mailer';
import { clientIp, rateLimit } from '@/lib/rate-limit';
import { SITE_URL } from '@/lib/site';
import { leadSchema, MIN_FORM_FILL_MS } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Bounded body size — a lead is small; anything larger is not a lead. */
const MAX_BODY_BYTES = 16 * 1024;

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store, no-cache, must-revalidate',
  'x-content-type-options': 'nosniff',
} as const;

function fail(status: number, error: string, extra?: Record<string, unknown>) {
  return NextResponse.json({ ok: false, error, ...extra }, { status, headers: jsonHeaders });
}

export async function POST(request: Request) {
  /* ---- 1. Origin check (defence in depth against cross-site posting) ---- */
  const origin = request.headers.get('origin');
  if (origin && !isAllowedOrigin(origin, request.headers)) {
    return fail(403, 'Request origin is not allowed.');
  }

  /* ---- 2. Content type must be JSON (blocks simple form CSRF) ---- */
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return fail(415, 'Expected application/json.');
  }

  /* ---- 3. Rate limit before doing any real work ---- */
  const ip = clientIp(request.headers);
  const limit = await rateLimit(`leads:${ip}`, RATE_LIMIT);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Too many submissions from this connection. Please try again shortly.',
      },
      {
        status: 429,
        headers: { ...jsonHeaders, 'retry-after': String(limit.retryAfter) },
      },
    );
  }

  /* ---- 4. Bounded read ---- */
  let raw: unknown;
  try {
    const declared = Number(request.headers.get('content-length') ?? '0');
    if (declared > MAX_BODY_BYTES) return fail(413, 'Payload too large.');

    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return fail(413, 'Payload too large.');

    raw = JSON.parse(text);
  } catch {
    return fail(400, 'Malformed request body.');
  }

  /* ---- 5. Schema validation ---- */
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? '_');
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return fail(422, 'Please check the highlighted fields.', { fieldErrors });
  }

  const lead = parsed.data;

  /* ---- 6. Silent bot checks — always answered with a generic success ----
     A bot that learns which signal tripped can adapt; a human never sees these
     paths, so we return the same shape as a genuine success and simply do not
     deliver the message. */
  const looksAutomated =
    Boolean(lead.company) || lead.elapsed < MIN_FORM_FILL_MS;

  if (looksAutomated) {
    return NextResponse.json({ ok: true }, { status: 202, headers: jsonHeaders });
  }

  /* ---- 7. Deliver ---- */
  try {
    await deliverLead(lead, {
      ip,
      userAgent: request.headers.get('user-agent') ?? 'unknown',
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    // Log server-side; never leak transport detail (keys, hostnames) to the client.
    console.error('[leads] delivery failed:', error);
    return fail(
      502,
      'We could not deliver your message just now. Please email us directly and we will pick it up.',
    );
  }

  return NextResponse.json({ ok: true }, { status: 201, headers: jsonHeaders });
}

/**
 * Only same-origin (and explicitly allowed) origins may post.
 *
 * The primary rule is a true same-origin comparison against the Host the
 * browser actually connected to, so the check keeps working on preview
 * deployments and custom domains without extra configuration. SITE_URL and
 * ALLOWED_ORIGINS cover any additional first-party front door (for example a
 * marketing domain proxied onto the same app).
 */
function isAllowedOrigin(origin: string, headers: Headers): boolean {
  const normalise = (value: string) => value.replace(/\/$/, '').toLowerCase();
  const allowed = new Set<string>([normalise(SITE_URL)]);

  const host = headers.get('host');
  if (host) {
    const proto =
      headers.get('x-forwarded-proto')?.split(',')[0]?.trim() ??
      (process.env.NODE_ENV === 'production' ? 'https' : 'http');
    allowed.add(normalise(`${proto}://${host}`));
    // A local server is reached over http even when NODE_ENV is production.
    if (/^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i.test(host)) {
      allowed.add(normalise(`http://${host}`));
    }
  }

  for (const extra of (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)) {
    allowed.add(normalise(extra));
  }

  return allowed.has(normalise(origin));
}

/** Everything other than POST is explicitly refused. */
export async function GET() {
  return fail(405, 'Method not allowed.');
}
