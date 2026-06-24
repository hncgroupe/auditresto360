import Link from 'next/link';

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

        {/* Carte radar décorative */}
        <div className="relative">
          <div className="rounded-3xl border border-ink/8 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">Rapport auditresto360</p>
              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">Score 78/100</span>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { l: 'Hygiène & HACCP', v: 72 },
                { l: 'Cuisine & production', v: 84 },
                { l: 'Ressources humaines', v: 61 },
                { l: 'Gestion & food cost', v: 70 },
                { l: 'Carte & commercial', v: 88 },
              ].map((b) => (
                <div key={b.l}>
                  <div className="flex justify-between text-xs text-ink/70">
                    <span>{b.l}</span>
                    <span className="font-semibold text-ink">{b.v}/100</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink/8">
                    <div className="h-full rounded-full bg-orange" style={{ width: `${b.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-xl bg-orange-50/70 px-4 py-3 text-xs text-ink/70">
              Exemple illustratif. Chaque audit produit un rapport noté, les points critiques et un plan d'action priorisé.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
