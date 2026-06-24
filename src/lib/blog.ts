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

/** Articles liés : même catégorie d'abord, complétés par les plus récents. */
export function getRelated(slug: string, n = 3): PostMeta[] {
  const all = getAllPostsMeta();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, n);
  const sameCat = all.filter((p) => p.slug !== slug && p.category === current.category);
  const others = all.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCat, ...others].slice(0, n);
}
