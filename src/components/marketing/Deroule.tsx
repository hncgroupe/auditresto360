import { Reveal } from '@/components/site/Reveal';

const ETAPES = [
  { n: '1', t: 'Échange & cadrage', d: 'On comprend votre projet, vos priorités et le périmètre. Vous recevez un devis clair.' },
  { n: '2', t: 'Audit sur place', d: 'Un auditeur passe en revue les 10 piliers : observation, mesures, photos, entretien dirigeant.' },
  { n: '3', t: 'Rapport noté', d: 'Notation par pilier, score global, points critiques signalés à part, le tout documenté.' },
  { n: '4', t: 'Plan d’action', d: 'Chaque écart devient une action concrète, priorisée, avec un délai conseillé. On débrief ensemble.' },
];

export function Deroule() {
  return (
    <section className="bg-orange-50/40 py-16">
      <div className="container-r">
        <div className="max-w-2xl">
          <span className="eyebrow">Comment ça se passe</span>
          <h2 className="section-title mt-3">Un déroulé simple, du premier contact au plan d’action</h2>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e, i) => (
            <Reveal key={e.n} delay={i * 60}>
              <div className="h-full rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-orange text-lg font-extrabold text-white">
                  {e.n}
                </span>
                <h3 className="mt-4 font-bold text-ink">{e.t}</h3>
                <p className="mt-2 text-sm text-ink/70">{e.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
