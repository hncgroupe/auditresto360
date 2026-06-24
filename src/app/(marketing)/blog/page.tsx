import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPostsMeta } from '@/lib/blog';
import { CtaBand } from '@/components/marketing/CtaBand';

export const metadata: Metadata = {
  title: 'Blog : conseils experts pour restaurateurs',
  description:
    "Hygiène et HACCP, gestion et food cost, RH, conformité, carte, développement : nos guides complets pour piloter et faire progresser votre restaurant.",
  alternates: { canonical: '/blog' },
};

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return iso;
  }
}

export default function BlogIndex() {
  const posts = getAllPostsMeta();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="aurora">
        <div className="container-r py-16">
          <span className="eyebrow">Le blog</span>
          <h1 className="section-title mt-3 max-w-3xl">Conseils d’experts pour faire tourner votre restaurant</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/75">
            Des guides concrets et sourcés sur l’hygiène, la gestion, les ressources humaines, la conformité et le développement. De quoi décider en connaissance de cause.
          </p>
        </div>
      </section>

      <section className="container-r py-12">
        {posts.length === 0 ? (
          <p className="text-ink/70">Les premiers articles arrivent très bientôt.</p>
        ) : (
          <>
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="card-hover group mb-10 block overflow-hidden rounded-3xl border border-ink/8 bg-white p-7 shadow-card sm:p-10"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-orange-600">{featured.category}</span>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tightest text-ink sm:text-3xl">{featured.title}</h2>
                <p className="mt-3 max-w-3xl text-ink/75">{featured.description}</p>
                <p className="mt-4 text-sm text-ink/50">
                  {fmtDate(featured.date)} · {featured.readingMinutes} min de lecture
                </p>
                <span className="mt-4 inline-flex font-semibold text-orange-700 group-hover:text-orange-800">Lire l’article →</span>
              </Link>
            )}

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="card-hover group flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-6 shadow-card"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-orange-600">{p.category}</span>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-ink">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink/70">{p.description}</p>
                  <p className="mt-4 text-xs text-ink/50">{fmtDate(p.date)} · {p.readingMinutes} min</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      <CtaBand />
    </>
  );
}
