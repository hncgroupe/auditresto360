import type { Metadata } from 'next';
import Link from 'next/link';
import { Deroule } from '@/components/marketing/Deroule';
import { Piliers } from '@/components/marketing/Piliers';
import { CtaBand } from '@/components/marketing/CtaBand';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Notre méthode d’audit 360°',
  description:
    "La méthode auditresto360 : 10 piliers notés sur 100, cas critiques signalés à part, score global et plan d'action priorisé. Une méthode rigoureuse, transparente et indépendante.",
  alternates: { canonical: '/methode' },
};

export default function MethodePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Méthode', path: '/methode' }])} />
      <section className="-mt-[72px] pt-[72px] aurora">
        <div className="container-r py-16 lg:py-20">
          <span className="eyebrow">La méthode</span>
          <h1 className="section-title mt-3 max-w-3xl">Une méthode rigoureuse, notée et transparente</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/75">
            Chaque pilier est évalué à partir de critères concrets observés sur place. Les points à impact sanitaire ou réglementaire sont notés plus sévèrement et présentés à part : ils ne sont jamais noyés dans la note globale.
          </p>
        </div>
      </section>

      <section className="container-r py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: 'Notation sur 100', d: 'Chaque critère est noté de 1 à 5. Le score d’un pilier est une moyenne pondérée : les critères critiques comptent double.' },
            { t: 'Cas critiques à part', d: 'Une non-conformité sanitaire ou réglementaire est toujours signalée distinctement, avec sa base de règle, et pèse sur le score global.' },
            { t: 'Plan d’action', d: 'Chaque écart devient une action concrète, avec une priorité et un délai conseillé. Reproductible et documenté.' },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
              <h2 className="text-base font-bold text-ink">{c.t}</h2>
              <p className="mt-2 text-sm text-ink/70">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-orange/20 bg-orange-50/60 p-6">
          <p className="text-sm text-ink/80">
            <strong>Ancrage réglementaire.</strong> Les critères d’hygiène et de conformité s’appuient sur la réglementation en vigueur (Paquet hygiène, règlement CE 852/2004, arrêté du 21/12/2009, règlement INCO 1169/2011). auditresto360 reste un audit conseil privé et indépendant : il aide à anticiper un contrôle, sans s’y substituer ni en garantir le résultat.
          </p>
        </div>
      </section>

      <Piliers />
      <Deroule />

      <section className="container-r py-14 text-center">
        <h2 className="section-title">Découvrez votre score</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-ink/75">
          Estimez votre audit en une minute et recevez votre devis personnalisé.
        </p>
        <Link href="/#configurateur" className="btn-primary mt-6 inline-flex">
          Estimer mon audit
        </Link>
      </section>

      <CtaBand />
    </>
  );
}
