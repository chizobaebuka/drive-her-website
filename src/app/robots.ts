import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Only a deployment that is positively identified as production may be
 * indexed. Every other case — preview, staging, an unset environment — falls
 * through to a site-wide disallow, so an unknown environment fails closed.
 *
 * `NEXT_PUBLIC_SITE_ENV` is the explicit override and wins everywhere. It is
 * only needed on hosts that do not announce themselves; Vercel's own
 * `VERCEL_ENV` is understood natively so a production deploy is indexable
 * without any extra configuration.
 */
function isProductionDeployment(): boolean {
  const explicit = process.env.NEXT_PUBLIC_SITE_ENV?.toLowerCase();
  if (explicit) return explicit === 'production';

  // Vercel sets this on every deployment: 'production' | 'preview' | 'development'.
  const vercelEnv = process.env.VERCEL_ENV?.toLowerCase();
  if (vercelEnv) return vercelEnv === 'production';

  // Netlify / Cloudflare Pages equivalents.
  const context = process.env.CONTEXT?.toLowerCase(); // Netlify
  if (context) return context === 'production';

  // Self-hosted: a production build is the production site.
  return process.env.NODE_ENV === 'production';
}

export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment()) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
