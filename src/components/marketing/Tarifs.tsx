import Link from 'next/link';
import { estimer, euros, MODULES } from '@/lib/config';

/**
 * Tarifs présentés comme « à partir de », calculés par le même moteur que le
 * configurateur (cohérence) et clairement indiqués comme estimations indicatives.
 * Les montants définitifs font l'objet d'un devis personnalisé.
 */

// Module ciblé le moins cher (1 module, petit établissement).
const moinsCher = [...MODULES].sort((a, b) => a.prix - b.prix)[0];
const aPartirModule = estimer({ modules: [moinsCher.id], taille: 'PETIT', nbEtab: '1', projet: 'EXPLOITATION' });
// Audit 360 complet (tous modules, petit établissement).
const aPartir360 = estimer({ modules: MODULES.map((m) => m.id), taille: 'PETIT', nbEtab: '1', projet: 'EXPLOITATION' });

const OFFRES = [
  {
    titre: 'Module ciblé',
    desc: 'Vous ciblez un ou plusieurs sujets précis : hygiène, RH, gestion, carte…',
    prix: aPartirModule ? `à partir de ${euros(aPartirModule.min)}` : 'sur devis',
    inclus: ['Le ou les modules choisis', 'Notation détaillée du périmètre', 'Points critiques signalés', 'Plan d’action ciblé'],
    populaire: false,
  },
  {
    titre: 'Audit 360° complet',
    desc: 'Le diagnostic global de votre restaurant, les 10 piliers en une intervention.',
    prix: aPartir360 ? `à partir de ${euros(aPartir360.min)}` : 'sur devis',
    inclus: ['Les 10 piliers audités', 'Score global + score par pilier', 'Cas critiques et conformité', 'Entretien dirigeant', 'Plan d’action priorisé complet', 'Tarif dégressif (bundle)'],
    populaire: true,
  },
  {
    titre: 'Groupe & franchise',
    desc: 'Plusieurs établissements ou un réseau : référentiel commun et notation comparable.',
    prix: 'étude sur devis',
    inclus: ['Audit multi-sites homogène', 'Notation comparable par site', 'Synthèse réseau', 'Tarif volume dégressif', 'Suivi dans le temps'],
    populaire: false,
  },
];

export function Tarifs() {
  return (
    <section id="tarifs" className="container-r scroll-mt-24 py-16">
      <div className="max-w-2xl">
        <span className="eyebrow">Tarifs</span>
        <h2 className="section-title mt-3">Un prix construit sur votre réalité</h2>
        <p className="mt-3 text-lg text-ink/75">
          Le tarif dépend du périmètre, de la taille et du nombre d’établissements. Voici les formats ; pour un chiffre précis, utilisez le configurateur.
        </p>
      </div>

      <div className="mt-9 grid gap-5 lg:grid-cols-3">
        {OFFRES.map((o) => (
          <div
            key={o.titre}
            className={`relative flex flex-col rounded-3xl border p-7 shadow-card ${
              o.populaire ? 'border-orange bg-white ring-1 ring-orange/30' : 'border-ink/8 bg-white'
            }`}
          >
            {o.populaire && (
              <span className="absolute -top-3 left-7 rounded-full bg-orange px-3 py-1 text-xs font-bold text-white">
                Le plus choisi
              </span>
            )}
            <h3 className="text-lg font-bold text-ink">{o.titre}</h3>
            <p className="mt-2 text-sm text-ink/70">{o.desc}</p>
            <p className="mt-4 text-2xl font-extrabold text-ink">{o.prix}</p>
            <p className="text-xs text-ink/50">HT, estimation indicative</p>
            <ul className="mt-5 flex-1 space-y-2">
              {o.inclus.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-ink/80">
                  <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-600">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/#configurateur" className={`mt-6 ${o.populaire ? 'btn-primary' : 'btn-ghost'} w-full`}>
              Estimer ce tarif
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-ink/55">
        Tarifs indicatifs calculés à partir de critères de cadrage, susceptibles d’évoluer. Le devis final est personnalisé après échange. Paiement en plusieurs fois possible. auditresto360 est un audit conseil privé et indépendant.
      </p>
    </section>
  );
}
