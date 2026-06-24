import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative overflow-hidden aurora">
      <div className="absolute inset-0 -z-10 grid-faint opacity-60" aria-hidden="true" />
      <div className="container-r grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <span className="eyebrow">Audit complet, indépendant</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tightest text-ink sm:text-5xl lg:text-[3.4rem]">
            L’audit <span className="text-gradient-orange">360°</span> qui révèle tout le potentiel de votre restaurant
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink/75">
            Hygiène et HACCP, ressources humaines, conformité, gestion et comptabilité, carte, expérience client et développement commercial. Un regard extérieur complet, des priorités claires, un plan d'action concret.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#configurateur" className="btn-primary">
              Estimer mon audit
            </Link>
            <Link href="/methode" className="btn-ghost">
              Voir la méthode
            </Link>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {[
              { n: '10', l: 'piliers analysés' },
              { n: '360°', l: 'vision complète' },
              { n: '100 %', l: 'indépendant' },
            ].map((s) => (
              <div key={s.l}>
                <dt className="text-2xl font-extrabold text-ink">{s.n}</dt>
                <dd className="text-sm text-ink/60">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Photo réelle + carte score en overlay */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-ink/8 shadow-soft sm:aspect-[5/5]">
            <Image
              src="/img/inspection.jpg"
              alt="Auditeur auditresto360 en inspection dans la cuisine d'un restaurant"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" aria-hidden="true" />
          </div>

          {/* Carte score flottante */}
          <div className="absolute -bottom-5 -left-3 w-[78%] max-w-xs rounded-2xl border border-ink/8 bg-white/95 p-4 shadow-soft backdrop-blur sm:-left-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-ink/70">Score d’audit 360°</p>
              <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-bold text-orange-700">78/100</span>
            </div>
            <div className="mt-3 space-y-2">
              {[
                { l: 'Hygiène & HACCP', v: 72 },
                { l: 'Gestion & food cost', v: 70 },
                { l: 'Carte & commercial', v: 88 },
              ].map((b) => (
                <div key={b.l}>
                  <div className="flex justify-between text-[11px] text-ink/65">
                    <span>{b.l}</span>
                    <span className="font-semibold text-ink">{b.v}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink/10">
                    <div className="h-full rounded-full bg-orange" style={{ width: `${b.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge indépendant flottant */}
          <div className="absolute -right-2 top-5 rounded-xl border border-ink/8 bg-white/95 px-3 py-2 shadow-card backdrop-blur sm:-right-4">
            <p className="text-xs font-bold text-ink">10 piliers</p>
            <p className="text-[11px] text-ink/60">audités sur place</p>
          </div>
        </div>
      </div>
    </section>
  );
}
