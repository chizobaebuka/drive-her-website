/**
 * Fixed-window rate limiter with two backends.
 *
 * If UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set the counter
 * lives in Redis, so every serverless instance and every region shares one
 * window — the limit means what it says. With neither set it falls back to a
 * per-process in-memory map, which is correct on a single long-lived Node
 * server and merely approximate on a horizontally scaled platform.
 *
 * The Redis path speaks the Upstash REST API over plain `fetch`, so there is
 * no dependency to install and nothing to bundle. If Redis is unreachable the
 * call degrades to the in-memory limiter rather than failing the request —
 * a lead is worth more than a perfectly enforced window.
 */

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

/** Stop the map growing without bound on a long-lived server. */
const MAX_KEYS = 10_000;

function sweep(now: number) {
  if (buckets.size < MAX_KEYS) return;
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key);
  }
  // Still oversized (an active flood) — drop the oldest half.
  if (buckets.size >= MAX_KEYS) {
    let i = 0;
    const target = Math.floor(buckets.size / 2);
    for (const key of buckets.keys()) {
      buckets.delete(key);
      if (++i >= target) break;
    }
  }
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  /** Seconds until the window resets — surfaced as Retry-After. */
  retryAfter: number;
  /** Which backend answered. Useful in logs; never sent to the client. */
  backend: 'redis' | 'memory';
};

export type RateLimitOptions = { limit: number; windowMs: number };

/**
 * Consume one unit against `key`. Prefers the shared store, falls back to the
 * in-process one.
 */
export async function rateLimit(
  key: string,
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  const shared = await redisLimit(key, options);
  if (shared) return shared;
  return memoryLimit(key, options);
}

/** Per-process fixed window. Exported for tests and for direct use. */
export function memoryLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0, backend: 'memory' };
  }

  entry.count += 1;
  const retryAfter = Math.ceil((entry.resetAt - now) / 1000);

  if (entry.count > limit) {
    return { ok: false, remaining: 0, retryAfter, backend: 'memory' };
  }

  return {
    ok: true,
    remaining: limit - entry.count,
    retryAfter,
    backend: 'memory',
  };
}

/**
 * Shared fixed window in Upstash Redis.
 *
 * One pipelined round trip: INCR the counter, set the TTL only if the key is
 * new (`EXPIRE ... NX`, so a running window is never extended), then read the
 * remaining TTL back for Retry-After.
 *
 * Returns `null` when Redis is not configured or did not answer cleanly, which
 * is the caller's signal to fall back.
 */
async function redisLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions,
): Promise<RateLimitResult | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, '');
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const windowSeconds = Math.max(1, Math.ceil(windowMs / 1000));
  const namespaced = `rl:${key}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);

  try {
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', namespaced],
        ['EXPIRE', namespaced, String(windowSeconds), 'NX'],
        ['PTTL', namespaced],
      ]),
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const payload: unknown = await res.json();
    if (!Array.isArray(payload) || payload.length < 3) return null;

    const count = numeric(payload[0]);
    const pttl = numeric(payload[2]);
    if (count === null) return null;

    // PTTL returns -1 (no expiry) or -2 (missing) on the unhappy path.
    const retryAfter =
      pttl !== null && pttl > 0 ? Math.ceil(pttl / 1000) : windowSeconds;

    return {
      ok: count <= limit,
      remaining: Math.max(0, limit - count),
      retryAfter: count <= limit ? 0 : retryAfter,
      backend: 'redis',
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function numeric(step: unknown): number | null {
  if (typeof step !== 'object' || step === null) return null;
  const result = (step as { result?: unknown; error?: unknown }).result;
  return typeof result === 'number' ? result : null;
}

/**
 * Best-effort client IP. Only the first hop of x-forwarded-for is used, and it
 * is validated as an IP so a spoofed header cannot poison the bucket key with
 * arbitrary text. Behind a proxy that does not set the header everyone shares
 * the `unknown` bucket, which fails safe (stricter, not looser).
 */
export function clientIp(headers: Headers): string {
  const candidates = [
    headers.get('cf-connecting-ip'),
    headers.get('x-real-ip'),
    headers.get('x-forwarded-for')?.split(',')[0],
  ];

  for (const raw of candidates) {
    const value = raw?.trim();
    if (value && isIpLike(value)) return value;
  }
  return 'unknown';
}

function isIpLike(value: string): boolean {
  if (value.length > 45) return false;
  // IPv4
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(value)) {
    return value.split('.').every((part) => Number(part) <= 255);
  }
  // IPv6 (loose but bounded — enough to reject injected text)
  return /^[0-9a-fA-F:]+$/.test(value) && value.includes(':');
}
