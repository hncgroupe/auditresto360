import type { Metadata } from 'next';
import Link from 'next/link';
import { VILLES } from '@/lib/villes';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { CtaBand } from '@/components/marketing/CtaBand';

export const metadata: Metadata = {
  title: 'Audit de restaurant par ville : nos zones d’intervention',
  description:
    "auditresto360 réalise l'audit complet de votre restaurant partout en France. Trouvez votre ville : Paris, Lyon, Marseille, Bordeaux, Lille et bien d'autres.",
  alternates: { canonical: '/audit-restaurant' },
};

export default function ZonesPage() {
  // Regroupe par région pour un index lisible.
  const parRegion = VILLES.reduce<Record<string, typeof VILLES>>((acc, v) => {
    (acc[v.region] ??= []).push(v);
    return acc;
  }, {});

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Zones', path: '/audit-restaurant' }])} />

      <section className="-mt-[72px] pt-[72px] aurora">
        <div className="container-r py-16">
          <span className="eyebrow">Zones d’intervention</span>
          <h1 className="section-title mt-3 max-w-3xl">L’audit de votre restaurant, partout en France</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/75">
            auditresto360 se déplace dans votre établissement, où qu’il soit. Choisissez votre ville pour en savoir plus, ou estimez directement votre audit.
          </p>
          <Link href="/#configurateur" className="btn-primary mt-7 inline-flex">Estimer mon audit</Link>
        </div>
      </section>

      <section className="container-r py-14">
        <div className="space-y-10">
          {Object.entries(parRegion).map(([region, villes]) => (
            <div key={region}>
              <h2 className="text-sm font-bold uppercase tracking-wide text-orange-600">{region}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {villes.map((v) => (
                  <Link
                    key={v.slug}
                    href={`/audit-restaurant/${v.slug}`}
                    className="card-hover flex items-center justify-between rounded-2xl border border-ink/8 bg-white px-5 py-4 shadow-card"
                  >
                    <span className="font-semibold text-ink">{v.nom}</span>
                    <span className="text-sm text-ink/50">{v.depCode}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-ink/60">
          Votre ville n’est pas listée ? Nous intervenons aussi ailleurs en France.{' '}
          <Link href="/contact" className="font-semibold text-orange-700 hover:underline">Contactez-nous</Link>.
        </p>
      </section>

      <CtaBand />
    </>
  );
}
