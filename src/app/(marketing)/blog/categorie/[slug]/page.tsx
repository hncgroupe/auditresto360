import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCategories, getCategoryBySlug, getPostsByCategory } from '@/lib/blog';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { CtaBand } from '@/components/marketing/CtaBand';

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

const INTROS: Record<string, string> = {
  'Hygiène & HACCP': "Tout pour maîtriser l'hygiène et le HACCP en restaurant : plan de maîtrise sanitaire, températures, traçabilité, nettoyage et marche en avant.",
  Conformité: "Vos obligations en restaurant : contrôle sanitaire, affichages obligatoires et information sur les allergènes, expliqués clairement.",
  'Gestion & rentabilité': "Reprenez la main sur vos marges : food cost, prix de vente, menu engineering, stocks, trésorerie et indicateurs de pilotage.",
  'Ressources humaines': "Recruter, intégrer, fidéliser et manager vos équipes en restauration, dans le respect du cadre social du secteur.",
  'Commercial & digital': "Développer son chiffre d'affaires : plateformes de livraison, avis Google, ticket moyen et fidélisation client.",
  'Projets & développement': "Ouvrir, reprendre ou développer un réseau : les audits et démarches clés pour sécuriser chaque étape.",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return {
    title: `${cat.name} : guides pour restaurateurs`,
    description: INTROS[cat.name] ?? `Nos articles experts sur ${cat.name.toLowerCase()} pour les restaurateurs.`,
    alternates: { canonical: `/blog/categorie/${slug}` },
  };
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return iso;
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();
  const posts = getPostsByCategory(cat.name);
  const cats = getCategories();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: cat.name, path: `/blog/categorie/${slug}` },
        ])}
      />

      <section className="aurora">
        <div className="container-r py-14">
          <nav className="text-sm text-ink/50" aria-label="Fil d'Ariane">
            <Link href="/blog" className="hover:text-orange-700">Blog</Link>
            <span className="px-1.5">/</span>
            <span>{cat.name}</span>
          </nav>
          <h1 className="section-title mt-4">{cat.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-ink/75">{INTROS[cat.name]}</p>
        </div>
      </section>

      <section className="container-r py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/blog" className="rounded-full border border-ink/12 px-3.5 py-1.5 text-sm font-semibold text-ink/70 hover:border-orange/50">Tout</Link>
          {cats.map((c) => (
            <Link
              key={c.slug}
              href={`/blog/categorie/${c.slug}`}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                c.slug === slug ? 'border-orange bg-orange text-white' : 'border-ink/12 text-ink/70 hover:border-orange/50'
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={p.cover} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold leading-snug text-ink">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm text-ink/70">{p.description}</p>
                <p className="mt-4 text-xs text-ink/50">{fmtDate(p.date)} · {p.readingMinutes} min</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
