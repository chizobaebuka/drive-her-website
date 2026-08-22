import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

const routes: Entry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/programmes', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/programmes/bayelsa', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/programmes/delta', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/investors', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/partners', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/ecosystem', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/women', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/drive-with-us', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/impact', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/legal/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/legal/terms', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
