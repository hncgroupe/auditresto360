import Image from 'next/image';
import { PaymentBadges } from './PaymentBadges';

const POINTS = [
  { t: 'Indépendant', d: 'Aucun lien commercial, un regard 100 % objectif.' },
  { t: 'Confidentiel', d: 'Vos données et votre rapport restent privés.' },
  { t: 'Concret', d: 'Un plan d’action priorisé, pas un rapport théorique.' },
];

export function TrustBar() {
  return (
    <section className="border-y border-ink/8 bg-white">
      <div className="container-r flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid gap-6 sm:grid-cols-3 lg:flex-1">
          {POINTS.map((p) => (
            <div key={p.t} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-600">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{p.t}</p>
                <p className="text-xs text-ink/65">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start gap-4 lg:items-end">
          <span className="inline-flex items-center gap-2 rounded-lg border border-ink/10 bg-white px-3 py-2">
            <Image src="/qualiopi.png" alt="Certifié Qualiopi" width={633} height={338} className="h-8 w-auto" />
            <span className="text-xs text-ink/60">Organisme certifié Qualiopi</span>
          </span>
          <PaymentBadges />
        </div>
      </div>
    </section>
  );
}
