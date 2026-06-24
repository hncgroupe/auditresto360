import Link from 'next/link';

/**
 * Rubrique « groupe » : présente le site frère audit hygiène (audithygiene.fr),
 * cabinet spécialisé hygiène/HACCP. Backlink cross-domaine.
 */
export function Groupe() {
  return (
    <section className="container-r py-16">
      <div className="overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-card">
        <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <span className="eyebrow">Le groupe</span>
            <h2 className="section-title mt-3">Besoin d’un audit hygiène seul ? Pensez à audit hygiène</h2>
            <p className="mt-4 text-ink/75">
              auditresto360 fait partie d’un groupe qui réunit deux expertises complémentaires. Quand vous voulez le diagnostic complet de votre restaurant (hygiène, RH, gestion, carte, commercial), c’est auditresto360.
            </p>
            <p className="mt-3 text-ink/75">
              Quand votre besoin porte uniquement sur l’<strong>hygiène et le HACCP</strong>, par exemple pour préparer un contrôle sanitaire ou mettre votre PMS à jour, notre cabinet frère{' '}
              <a href="https://audithygiene.fr" target="_blank" rel="noopener" className="font-semibold text-orange-700 hover:underline">
                audit hygiène
              </a>{' '}
              est spécialisé sur ce terrain : audit hygiène et HACCP, notation, cas critiques, plan correctif.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://audithygiene.fr" target="_blank" rel="noopener" className="btn-ghost">
                Découvrir audit hygiène
              </a>
              <Link href="/#configurateur" className="btn-primary">
                Mon audit 360°
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl border border-ink/8 bg-orange-50/50 p-5">
              <p className="text-sm font-bold text-ink">auditresto360</p>
              <p className="mt-1 text-xs text-ink/70">L’audit complet du restaurant : 10 piliers, hygiène + gestion + RH + commercial.</p>
            </div>
            <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-card">
              <p className="text-sm font-bold text-ink">audit hygiène</p>
              <p className="mt-1 text-xs text-ink/70">Le spécialiste hygiène et HACCP, pour anticiper un contrôle sanitaire.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
