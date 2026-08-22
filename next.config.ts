import path from 'node:path';
import type { NextConfig } from 'next';

/**
 * Content Security Policy.
 *
 * The site is fully statically generated, so a per-request nonce is not used —
 * that would force every page to render dynamically and give up CDN caching.
 * Instead the policy locks down every directive that matters (no object, no
 * frame, no base-uri hijack, no form posting off-site) and leaves inline
 * scripts allowed only because Next.js inlines its own hydration payload.
 *
 * The XSS surface that would exploit that allowance is closed at the source:
 * the app renders no user-supplied HTML, uses `dangerouslySetInnerHTML` in
 * exactly one place (escaped JSON-LD produced by our own code), and accepts no
 * content from third parties.
 *
 * If you later add user-generated content, switch to nonce mode — see
 * SECURITY.md for the middleware drop-in.
 */
/**
 * Extra origins for third-party tooling (analytics, tag managers, consent
 * banners). Set at BUILD time — next.config.ts is evaluated when the app is
 * compiled, not per request.
 *
 *   CSP_SCRIPT_SRC=https://www.googletagmanager.com
 *   CSP_CONNECT_SRC=https://www.google-analytics.com https://region1.google-analytics.com
 *   CSP_IMG_SRC=https://www.google-analytics.com
 *   CSP_FRAME_SRC=https://www.youtube-nocookie.com
 *
 * Space-separated. Leave unset and the policy stays first-party only.
 */
function extra(name: string): string {
  const value = process.env[name]?.trim();
  return value ? ` ${value.split(/\s+/).filter(Boolean).join(' ')}` : '';
}

const frameSrc = extra('CSP_FRAME_SRC');

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${extra('CSP_SCRIPT_SRC')}`,
  `style-src 'self' 'unsafe-inline'${extra('CSP_STYLE_SRC')}`,
  `img-src 'self' data: blob:${extra('CSP_IMG_SRC')}`,
  `font-src 'self' data:${extra('CSP_FONT_SRC')}`,
  `connect-src 'self'${extra('CSP_CONNECT_SRC')}`,
  "manifest-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  // Only widened when an embed origin is explicitly configured.
  frameSrc ? `frame-src${frameSrc}` : "frame-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  {
    key: 'Strict-Transport-Security',
    // No `preload` token: submission to the browser preload list is
    // effectively permanent and every current and future subdomain must
    // serve HTTPS. Add it deliberately once that is true.
    value: 'max-age=63072000; includeSubDomains',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: [
      'accelerometer=()',
      'autoplay=()',
      'camera=()',
      'display-capture=()',
      'encrypted-media=()',
      'fullscreen=(self)',
      'geolocation=()',
      'gyroscope=()',
      'magnetometer=()',
      'microphone=()',
      'midi=()',
      'payment=()',
      'usb=()',
      'interest-cohort=()',
    ].join(', '),
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'Origin-Agent-Cluster', value: '?1' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Pin the trace root to this project so a package.json in a parent directory
  // (a monorepo sibling, a stray lockfile) cannot widen the build's file trace.
  outputFileTracingRoot: path.resolve(process.cwd()),

  // Never leak the framework version in response headers.
  poweredByHeader: false,

  // Trailing-slash-free canonical URLs.
  trailingSlash: false,

  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    // All imagery is first-party and served from /public. No remote patterns
    // are allowed, which closes the image-optimiser SSRF class outright.
    remotePatterns: [],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: false,
  },

  experimental: {
    optimizePackageImports: ['zod'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Fingerprinted build assets are safe to cache forever.
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: '/investor', destination: '/investors', permanent: true },
      { source: '/invest', destination: '/investors', permanent: true },
      { source: '/bayelsa', destination: '/programmes/bayelsa', permanent: true },
      { source: '/delta', destination: '/programmes/delta', permanent: true },
      { source: '/drivers', destination: '/drive-with-us', permanent: true },
      { source: '/partnership', destination: '/partners', permanent: true },
    ];
  },
};

export default nextConfig;
