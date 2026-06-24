import type { MetadataRoute } from 'next';
import { env } from '@/lib/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.siteUrl;
  const now = new Date();
  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1, freq: 'weekly' },
    { path: '/methode', priority: 0.9, freq: 'monthly' },
    { path: '/pour-qui', priority: 0.9, freq: 'monthly' },
    { path: '/a-propos', priority: 0.6, freq: 'monthly' },
    { path: '/faq', priority: 0.7, freq: 'monthly' },
    { path: '/contact', priority: 0.7, freq: 'monthly' },
    { path: '/mentions-legales', priority: 0.2, freq: 'yearly' },
    { path: '/confidentialite', priority: 0.2, freq: 'yearly' },
    { path: '/cgv', priority: 0.2, freq: 'yearly' },
  ];
  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
