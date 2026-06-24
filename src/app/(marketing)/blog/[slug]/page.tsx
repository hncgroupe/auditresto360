import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getPost, getRelated } from '@/lib/blog';
import { env } from '@/lib/env';
import { JsonLd } from '@/components/site/JsonLd';
import { CtaBand } from '@/components/marketing/CtaBand';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `${env.siteUrl}/blog/${slug}`,
      publishedTime: post.date,
    },
  };
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return iso;
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelated(slug, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'auditresto360', url: env.siteUrl },
    publisher: { '@id': `${env.siteUrl}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${env.siteUrl}/blog/${slug}` },
    inLanguage: 'fr-FR',
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: env.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${env.siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${env.siteUrl}/blog/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumb} />

      <article className="container-r py-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <nav className="text-sm text-ink/50" aria-label="Fil d'Ariane">
            <Link href="/blog" className="hover:text-orange-700">Blog</Link>
            <span className="px-1.5">/</span>
            <span>{post.category}</span>
          </nav>

          <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-wide text-orange-600">{post.category}</span>
          <h1 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-tightest text-ink sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-ink/75">{post.description}</p>
          <p className="mt-5 border-b border-ink/10 pb-6 text-sm text-ink/50">
            Par {post.author} · {fmtDate(post.date)} · {post.readingMinutes} min de lecture
          </p>

          <div
            className="prose prose-neutral mt-8 max-w-none prose-headings:font-extrabold prose-headings:tracking-tightest prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-xl prose-a:text-orange-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-li:marker:text-orange-500"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="mt-10 rounded-2xl border border-orange/20 bg-orange-50/60 p-6">
            <h2 className="text-lg font-bold text-ink">Envie d’un regard expert sur votre restaurant ?</h2>
            <p className="mt-2 text-sm text-ink/75">
              auditresto360 réalise l’audit complet et indépendant de votre établissement. Estimez votre audit en une minute.
            </p>
            <Link href="/#configurateur" className="btn-primary mt-4 inline-flex">Estimer mon audit</Link>
          </div>

          <p className="mt-8 text-xs text-ink/50">
            auditresto360 est un audit conseil privé et indépendant. Cet article est fourni à titre d’information et ne remplace pas un conseil juridique ou réglementaire personnalisé.
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-r pb-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="section-title text-2xl">À lire aussi</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="card-hover flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
                  <span className="text-xs font-semibold uppercase tracking-wide text-orange-600">{p.category}</span>
                  <h3 className="mt-2 text-base font-bold leading-snug text-ink">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink/70">{p.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
