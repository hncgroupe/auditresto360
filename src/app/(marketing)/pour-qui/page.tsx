import type { Metadata } from 'next';
import { PourQui } from '@/components/marketing/PourQui';
import { Configurateur } from '@/components/marketing/Configurateur';
import { CtaBand } from '@/components/marketing/CtaBand';

export const metadata: Metadata = {
  title: 'Pour qui : indépendant, ouverture, reprise, groupe',
  description:
    "auditresto360 s'adapte à votre situation : restaurateur indépendant, ouverture ou création, reprise ou rachat, groupe et franchise. Périmètre et profondeur ajustés à votre projet.",
  alternates: { canonical: '/pour-qui' },
};

export default function PourQuiPage() {
  return (
    <>
      <section className="aurora">
        <div className="container-r py-16 lg:py-20">
          <span className="eyebrow">Pour qui</span>
          <h1 className="section-title mt-3 max-w-3xl">Un audit pensé pour chaque situation</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/75">
            Que vous soyez seul aux commandes, en train d’ouvrir, sur le point de racheter ou à la tête d’un groupe, l’audit s’ajuste à votre réalité et à vos enjeux.
          </p>
        </div>
      </section>
      <PourQui />
      <Configurateur />
      <CtaBand />
    </>
  );
}
