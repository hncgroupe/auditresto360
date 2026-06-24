import { Reveal } from '@/components/site/Reveal';
import { PILIERS_360 } from '@/lib/constants';

const DETAIL: Record<string, string> = {
  P1: 'Extérieur, salle, accueil, propreté, parcours et confort du client.',
  P2: 'Organisation des postes, fiches techniques, dressage, contrôle qualité.',
  P3: 'Stockage, rotation FIFO, DLC, séparation du cru, hygiène de la réserve.',
  P4: 'PMS, températures, traçabilité, nettoyage, affichages obligatoires.',
  P5: 'Plannings, contrats, social, formation, climat et polyvalence.',
  P6: 'Productivité, fluidité du service, coordination cuisine-salle.',
  P7: 'Stocks, achats, food cost, marges, caisse et clôtures.',
  P8: 'Carte, rentabilité, plateformes de livraison, ticket moyen, offres.',
  P9: 'Logiciels, tableaux de bord, KPI et pilotage de l’activité.',
  P10: 'Vos problèmes, vos priorités, vos objectifs : l’entretien dirigeant.',
};

export function Piliers() {
  return (
    <section id="piliers" className="scroll-mt-24 bg-ink py-16 text-white">
      <div className="container-r">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-orange-400">
            L’audit 360°
          </span>
          <h2 className="section-title mt-3 text-white">10 piliers, un seul rapport</h2>
          <p className="mt-3 text-lg text-white/70">
            Chaque pilier est noté sur 100 à partir de critères précis. Les points à impact sanitaire ou réglementaire sont notés plus sévèrement et signalés à part.
          </p>
        </div>
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PILIERS_360.map((p, i) => (
            <Reveal key={p.code} delay={i * 40}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-orange/40 hover:bg-white/[0.08]">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{p.icone}</span>
                  <h3 className="font-bold text-white">{p.nom}</h3>
                </div>
                <p className="mt-2 text-sm text-white/65">{DETAIL[p.code]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
