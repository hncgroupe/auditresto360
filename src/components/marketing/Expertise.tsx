import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/site/Reveal';

const PREUVES = [
  { t: 'Auditeurs terrain', d: 'Des professionnels qui connaissent la cuisine, la salle et la gestion, pas des cases à cocher.' },
  { t: 'Méthode notée', d: 'Une grille de 10 piliers, des critères mesurés, un score reproductible et documenté.' },
  { t: 'Organisme Qualiopi', d: 'Démarche qualité reconnue, au service de la rigueur de nos audits.' },
];

export function Expertise() {
  return (
    <section className="container-r py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-ink/8 shadow-soft">
              <Image
                src="/img/auditeur-2.jpg"
                alt="Auditeur auditresto360 en échange avec un restaurateur"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 right-4 rounded-2xl border border-ink/8 bg-white px-5 py-4 shadow-soft">
              <p className="text-2xl font-extrabold text-ink">360°</p>
              <p className="text-xs text-ink/60">de votre restaurant</p>
            </div>
          </div>
        </Reveal>

        <div>
          <span className="eyebrow">Notre signature</span>
          <h2 className="section-title mt-3">Un audit mené par des gens du métier</h2>
          <p className="mt-3 text-lg text-ink/75">
            On ne juge pas un restaurant depuis un bureau. Nos auditeurs passent en cuisine, en salle et dans les chiffres, puis traduisent leurs constats en actions concrètes.
          </p>
          <div className="mt-7 space-y-5">
            {PREUVES.map((p) => (
              <div key={p.t} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-600">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-ink">{p.t}</p>
                  <p className="text-sm text-ink/70">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/methode" className="btn-ghost mt-8 inline-flex">Découvrir la méthode</Link>
        </div>
      </div>
    </section>
  );
}
