import { Reveal } from '@/components/site/Reveal';

const MAUX = [
  { t: 'Vous travaillez dur, la marge ne suit pas', d: 'Food cost qui dérape, portions non tenues, gaspillage : le bénéfice se perd sans qu’on sache où.' },
  { t: 'Le contrôle sanitaire vous inquiète', d: 'PMS incomplet, traçabilité à trous, affichages manquants : un passage et tout peut basculer.' },
  { t: 'L’équipe tourne, mais sans cap', d: 'Plannings de dernière minute, turnover, briefs absents : l’organisation repose sur vous seul.' },
  { t: 'Vous sentez un potentiel inexploité', d: 'Carte, ticket moyen, plateformes de livraison : des leviers de chiffre d’affaires laissés de côté.' },
];

export function Probleme() {
  return (
    <section className="container-r py-16">
      <div className="max-w-2xl">
        <span className="eyebrow">Le constat</span>
        <h2 className="section-title mt-3">Un restaurant, dix problèmes qui s’entremêlent</h2>
        <p className="mt-3 text-lg text-ink/75">
          Hygiène, RH, gestion, carte : tout est lié. Régler un point sans voir l’ensemble ne suffit pas. auditresto360 prend le restaurant dans sa totalité.
        </p>
      </div>
      <div className="mt-9 grid gap-4 sm:grid-cols-2">
        {MAUX.map((m, i) => (
          <Reveal key={m.t} delay={i * 60}>
            <div className="card-hover h-full rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
              <h3 className="text-base font-bold text-ink">{m.t}</h3>
              <p className="mt-2 text-sm text-ink/70">{m.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
