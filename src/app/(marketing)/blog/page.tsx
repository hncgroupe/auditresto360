import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
                className="card-hover group mb-10 grid overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-card md:grid-cols-2"
              >
                <div className="relative min-h-[240px] overflow-hidden md:min-h-[340px]">
                  <Image
                    src={featured.cover}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-orange px-3 py-1 text-xs font-bold text-white shadow-glow">
                    {featured.category}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <span className="text-xs font-semibold uppercase tracking-wide text-orange-600">À la une</span>
                  <h2 className="mt-3 text-2xl font-extrabold tracking-tightest text-ink sm:text-3xl">{featured.title}</h2>
                  <p className="mt-3 text-ink/75">{featured.description}</p>
                  <p className="mt-4 text-sm text-ink/50">{fmtDate(featured.date)} · {featured.readingMinutes} min de lecture</p>
                  <span className="mt-4 inline-flex font-semibold text-orange-700 group-hover:text-orange-800">Lire l’article →</span>
                </div>
              </Link>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-card"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.cover}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-orange-700 backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold leading-snug text-ink">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-ink/70">{p.description}</p>
                    <p className="mt-4 text-xs text-ink/50">{fmtDate(p.date)} · {p.readingMinutes} min</p>
                  </div>
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
