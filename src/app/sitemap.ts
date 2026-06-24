import type { MetadataRoute } from 'next';
import { env } from '@/lib/env';
import { getAllPostsMeta, getCategories } from '@/lib/blog';
import { VILLES } from '@/lib/villes';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.siteUrl;
  const now = new Date();
  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1, freq: 'weekly' },
    { path: '/methode', priority: 0.9, freq: 'monthly' },
    { path: '/pour-qui', priority: 0.9, freq: 'monthly' },
    { path: '/audit-restaurant', priority: 0.8, freq: 'monthly' },
    { path: '/blog', priority: 0.8, freq: 'weekly' },
    { path: '/a-propos', priority: 0.6, freq: 'monthly' },
    { path: '/faq', priority: 0.7, freq: 'monthly' },
    { path: '/contact', priority: 0.7, freq: 'monthly' },
    { path: '/mentions-legales', priority: 0.2, freq: 'yearly' },
    { path: '/confidentialite', priority: 0.2, freq: 'yearly' },
    { path: '/cgv', priority: 0.2, freq: 'yearly' },
  ];
  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
  const postEntries: MetadataRoute.Sitemap = getAllPostsMeta().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
  const categoryEntries: MetadataRoute.Sitemap = getCategories().map((c) => ({
    url: `${base}/blog/categorie/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));
  const villeEntries: MetadataRoute.Sitemap = VILLES.map((v) => ({
    url: `${base}/audit-restaurant/${v.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
  return [...staticEntries, ...postEntries, ...categoryEntries, ...villeEntries];
}
