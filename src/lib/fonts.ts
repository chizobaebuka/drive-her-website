import localFont from 'next/font/local';

/**
 * Fonts are self-hosted rather than loaded from Google Fonts.
 *
 * Three reasons: no third-party request means no visitor data leaves the
 * origin, the Content Security Policy can keep `font-src 'self'` with no
 * external allowance, and the files are served from the same connection as the
 * page (no extra DNS + TLS handshake on first paint).
 *
 * Only the latin subset is shipped. Metric overrides are supplied so the
 * fallback font occupies almost exactly the same space, keeping cumulative
 * layout shift at zero while the webfont loads.
 */

export const inter = localFont({
  src: [
    {
      path: '../fonts/inter-latin-wght-normal.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  adjustFontFallback: 'Arial',
});

export const display = localFont({
  src: [
    { path: '../fonts/sora-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/sora-latin-700-normal.woff2', weight: '700', style: 'normal' },
    { path: '../fonts/sora-latin-800-normal.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
  adjustFontFallback: 'Arial',
});
