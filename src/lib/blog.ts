import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

/** Répertoire des articles markdown. */
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO (AAAA-MM-JJ)
  author: string;
  category: string;
  tags: string[];
  readingMinutes: number;
  cover: string;
}

/** Banque de visuels par catégorie (photos réelles dans /public/img). */
const COVERS: Record<string, string[]> = {
  'Hygiène & HACCP': ['/img/cuisine-propre.jpg', '/img/inspection.jpg', '/img/controle-cover.webp'],
  Conformité: ['/img/inspection.jpg', '/img/audit-tablette.jpg', '/img/controle-cover.webp'],
  'Gestion & rentabilité': ['/img/audit-tablette.jpg', '/img/services.webp', '/img/support.webp'],
  'Ressources humaines': ['/img/chef.jpg', '/img/audit-heureux.webp', '/img/support.webp'],
  'Commercial & digital': ['/img/services.webp', '/img/audit-tablette.jpg', '/img/audit-heureux.webp'],
  'Projets & développement': ['/img/controle-cover.webp', '/img/cuisine-propre.jpg', '/img/chef.jpg'],
};
const FALLBACK_COVERS = ['/img/cuisine-propre.jpg', '/img/inspection.jpg', '/img/audit-tablette.jpg'];

/** Choisit un visuel stable pour un article (varie dans la catégorie selon le slug). */
export function coverFor(category: string, slug: string): string {
  const pool = COVERS[category] ?? FALLBACK_COVERS;
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return pool[h % pool.length];
}

export interface Post extends PostMeta {
  html: string;
  raw: string;
}

marked.setOptions({ gfm: true, breaks: false });

function listFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
}

function readPost(file: string): Post {
  const slug = file.replace(/\.md$/, '');
  const rawFile = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
  const { data, content } = matter(rawFile);
  const words = content.split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(words / 220));
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: String(data.date ?? '1970-01-01'),
    author: String(data.author ?? 'auditresto360'),
    category: String(data.category ?? 'Conseils'),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes,
    cover: data.cover ? String(data.cover) : coverFor(String(data.category ?? 'Conseils'), slug),
    raw: content,
    html: marked.parse(content) as string,
  };
}

export function getAllPostsMeta(): PostMeta[] {
  return listFiles()
    .map((f) => {
      const p = readPost(f);
      const { html: _html, raw: _raw, ...meta } = p;
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(BLOG_DIR, file))) return null;
  return readPost(file);
}

export function getAllSlugs(): string[] {
  return listFiles().map((f) => f.replace(/\.md$/, ''));
}

/** Slug d'une catégorie (pour les URL /blog/categorie/[slug]). */
export function categorySlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, 'et')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface CategoryInfo {
  name: string;
  slug: string;
  count: number;
}

/** Liste des catégories présentes, avec leur nombre d'articles. */
export function getCategories(): CategoryInfo[] {
  const map = new Map<string, number>();
  for (const p of getAllPostsMeta()) map.set(p.category, (map.get(p.category) ?? 0) + 1);
  return [...map.entries()]
    .map(([name, count]) => ({ name, slug: categorySlug(name), count }))
    .sort((a, b) => b.count - a.count);
}

export function getCategoryBySlug(slug: string): CategoryInfo | null {
  return getCategories().find((c) => c.slug === slug) ?? null;
}

export function getPostsByCategory(name: string): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.category === name);
}

/** Articles liés : même catégorie d'abord, complétés par les plus récents. */
export function getRelated(slug: string, n = 3): PostMeta[] {
  const all = getAllPostsMeta();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, n);
  const sameCat = all.filter((p) => p.slug !== slug && p.category === current.category);
  const others = all.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCat, ...others].slice(0, n);
}
