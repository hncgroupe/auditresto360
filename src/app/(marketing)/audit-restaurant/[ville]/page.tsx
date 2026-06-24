import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VILLES, getVille } from '@/lib/villes';
import { env } from '@/lib/env';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { PILIERS_360 } from '@/lib/constants';
import { FORMULES, euros, TVA_MENTION } from '@/lib/config';
import { Faq } from '@/components/marketing/Faq';
import { CtaBand } from '@/components/marketing/CtaBand';
import { TrustpilotBadge } from '@/components/marketing/TrustpilotBadge';

export const dynamicParams = false;

export function generateStaticParams() {
  return VILLES.map((v) => ({ ville: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville } = await params;
  const v = getVille(ville);
  if (!v) return {};
  return {
    title: `Audit de restaurant ${v.prep} ${v.nom} (${v.depCode}) | auditresto360`,
    description: `Audit complet et indépendant de votre restaurant ${v.prep} ${v.nom} : hygiène HACCP, RH, conformité, gestion, carte. Rapport noté et plan d'action. Devis en 1 minute.`,
    alternates: { canonical: `/audit-restaurant/${v.slug}` },
  };
}

export default async function VillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const v = getVille(ville);
  if (!v) notFound();

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `auditresto360 - Audit de restaurant ${v.prep} ${v.nom}`,
    description: `Audit complet et indépendant de restaurant ${v.prep} ${v.nom} (${v.departement}) : hygiène, HACCP, RH, gestion, conformité.`,
    url: `${env.siteUrl}/audit-restaurant/${v.slug}`,
    areaServed: { '@type': 'City', name: v.nom },
    provider: { '@id': `${env.siteUrl}/#organization` },
    serviceType: 'Audit de restaurant',
  };

  return (
    <>
      <JsonLd data={localBusiness} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Zones', path: '/audit-restaurant' },
          { name: v.nom, path: `/audit-restaurant/${v.slug}` },
        ])}
      />

      <section className="-mt-[72px] pt-[72px] aurora">
        <div className="container-r py-16 lg:py-20">
          <nav className="text-sm text-ink/50" aria-label="Fil d'Ariane">
            <Link href="/audit-restaurant" className="hover:text-orange-700">Zones</Link>
            <span className="px-1.5">/</span>
            <span>{v.nom}</span>
          </nav>
          <span className="eyebrow mt-4">Audit de restaurant {v.prep} {v.nom}</span>
          <h1 className="section-title mt-3 max-w-3xl">
            L’audit 360° de votre restaurant {v.prep} <span className="text-gradient-orange">{v.nom}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/75">{v.angle}</p>
          <p className="mt-3 max-w-2xl text-ink/70">
            auditresto360 intervient {v.prep} {v.nom} et dans tout le département {v.departement} ({v.depCode}), en {v.region}. Hygiène et HACCP, ressources humaines, conformité, gestion et comptabilité, carte et développement commercial : un regard extérieur complet, noté, avec un plan d’action concret.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/#configurateur" className="btn-primary">Estimer mon audit</Link>
            <Link href="/methode" className="btn-ghost">Voir la méthode</Link>
          </div>
          <TrustpilotBadge className="mt-6" />
        </div>
      </section>

      {/* Piliers */}
      <section className="container-r py-14">
        <h2 className="section-title">Ce que nous auditons {v.prep} {v.nom}</h2>
        <p className="mt-3 max-w-2xl text-lg text-ink/75">Les 10 piliers de votre restaurant, chacun noté sur 100.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PILIERS_360.map((p) => (
            <div key={p.code} className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-white p-4 shadow-card">
              <span className="text-2xl" aria-hidden="true">{p.icone}</span>
              <span className="font-semibold text-ink">{p.nom}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Formules */}
      <section className="bg-orange-50/40 py-14">
        <div className="container-r">
          <h2 className="section-title">Nos formules {v.prep} {v.nom}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {FORMULES.map((f) => (
              <div key={f.id} className={`rounded-3xl border p-7 shadow-card ${f.populaire ? 'border-orange bg-white ring-1 ring-orange/30' : 'border-ink/8 bg-white'}`}>
                <h3 className="text-lg font-bold text-ink">{f.nom}</h3>
                <p className="mt-2 text-sm text-ink/70">{f.resume}</p>
                <p className="mt-3 text-3xl font-extrabold text-ink">{euros(f.prix)}</p>
                <p className="text-xs text-ink/50">{TVA_MENTION}</p>
                <Link href="/#configurateur" className={`mt-5 ${f.populaire ? 'btn-primary' : 'btn-ghost'} w-full`}>Choisir</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq />
      <CtaBand />
    </>
  );
}
