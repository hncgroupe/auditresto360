import Link from 'next/link';
import { FORMULES, euros, TVA_MENTION } from '@/lib/config';

/** Tarifs réels (prix fermes, non assujettis à la TVA). */
export function Tarifs() {
  return (
    <section id="tarifs" className="container-r scroll-mt-24 py-16">
      <div className="max-w-2xl">
        <span className="eyebrow">Tarifs</span>
        <h2 className="section-title mt-3">Des tarifs clairs, sans surprise</h2>
        <p className="mt-3 text-lg text-ink/75">
          Deux formules à prix ferme pour un établissement. Pour un groupe ou plusieurs restaurants, le devis est dégressif et sur mesure.
        </p>
      </div>

      <div className="mt-9 grid gap-5 lg:grid-cols-3">
        {FORMULES.map((f) => (
          <div
            key={f.id}
            className={`relative flex flex-col rounded-3xl border p-7 shadow-card ${
              f.populaire ? 'border-orange bg-white ring-1 ring-orange/30' : 'border-ink/8 bg-white'
            }`}
          >
            {f.populaire && (
              <span className="absolute -top-3 left-7 rounded-full bg-orange px-3 py-1 text-xs font-bold text-white">
                Le plus choisi
              </span>
            )}
            <h3 className="text-lg font-bold text-ink">{f.nom}</h3>
            <p className="mt-2 text-sm text-ink/70">{f.resume}</p>
            <p className="mt-4 text-3xl font-extrabold text-ink">{euros(f.prix)}</p>
            <p className="text-xs text-ink/50">{TVA_MENTION}</p>
            <ul className="mt-5 flex-1 space-y-2">
              {f.inclus.map((it) => (
                <li key={it} className="flex items-start gap-2 text-sm text-ink/80">
                  <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-600">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {it}
                </li>
              ))}
            </ul>
            <Link href="/#configurateur" className={`mt-6 ${f.populaire ? 'btn-primary' : 'btn-ghost'} w-full`}>
              Choisir cette formule
            </Link>
          </div>
        ))}

        {/* Groupe / multi-sites */}
        <div className="flex flex-col rounded-3xl border border-ink/8 bg-ink p-7 text-white shadow-card">
          <h3 className="text-lg font-bold">Groupe & multi-sites</h3>
          <p className="mt-2 text-sm text-white/70">Plusieurs restaurants ou un réseau de franchise.</p>
          <p className="mt-4 text-3xl font-extrabold">Sur devis</p>
          <p className="text-xs text-white/50">Tarif dégressif</p>
          <ul className="mt-5 flex-1 space-y-2 text-sm text-white/80">
            {['Audit multi-sites homogène', 'Référentiel commun', 'Notation comparable par site', 'Synthèse réseau', 'Accompagnement dans le temps'].map((it) => (
              <li key={it} className="flex items-start gap-2">
                <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-white/10 text-orange-300">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {it}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:border-white/50">
            Demander un devis
          </Link>
        </div>
      </div>
      <p className="mt-5 text-xs text-ink/55">
        Prix fermes pour un établissement. Paiement en plusieurs fois possible. auditresto360 n'est pas assujetti à la TVA (art. 293 B du CGI). Audit conseil privé et indépendant.
      </p>
    </section>
  );
}
