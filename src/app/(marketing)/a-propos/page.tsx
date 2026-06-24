import type { Metadata } from 'next';
import { CtaBand } from '@/components/marketing/CtaBand';
import { JsonLd } from '@/components/site/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "auditresto360 : un audit conseil complet et indépendant pour les restaurants et les groupes. Notre mission, notre approche, notre cadre d'indépendance.",
  alternates: { canonical: '/a-propos' },
};

export default function AProposPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'À propos', path: '/a-propos' }])} />
      <section className="-mt-[72px] pt-[72px] aurora">
        <div className="container-r py-16 lg:py-20">
          <span className="eyebrow">À propos</span>
          <h1 className="section-title mt-3 max-w-3xl">Le regard extérieur qui fait progresser votre restaurant</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/75">
            auditresto360 est né d’un constat simple : dans un restaurant, hygiène, équipe, gestion et carte sont indissociables. Les auditer séparément ne suffit pas. Nous proposons un audit complet, sur le terrain, qui prend l’établissement dans sa totalité.
          </p>
        </div>
      </section>

      <section className="container-r py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: 'Notre mission', d: 'Donner à chaque restaurateur une vision claire de son établissement et un chemin concret pour gagner en conformité, en organisation et en rentabilité.' },
            { t: 'Notre approche', d: 'Du terrain avant tout : on observe, on mesure, on photographie, on échange avec le dirigeant. Puis on note, on hiérarchise, on propose.' },
            { t: 'Notre indépendance', d: 'Aucun lien commercial avec un fournisseur ou un éditeur. Notre seul produit est notre objectivité. Vos données et votre rapport restent confidentiels.' },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
              <h2 className="text-base font-bold text-ink">{c.t}</h2>
              <p className="mt-2 text-sm text-ink/70">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
          <h2 className="text-lg font-bold text-ink">Notre cadre</h2>
          <p className="mt-2 text-sm text-ink/75">
            auditresto360 est un audit conseil privé et indépendant. Il ne constitue ni une certification officielle, ni un agrément d’État, ni un contrôle des services vétérinaires ou de la DDPP. Notre rapport aide à anticiper un contrôle et à structurer la mise en conformité ; il ne garantit pas le résultat d’un contrôle officiel.
          </p>
          {/* TODO : présentation de l'équipe, expérience, références réelles (no-fake-content). */}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
