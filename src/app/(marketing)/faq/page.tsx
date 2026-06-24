import type { Metadata } from 'next';
import { Faq } from '@/components/marketing/Faq';
import { CtaBand } from '@/components/marketing/CtaBand';
import { JsonLd } from '@/components/site/JsonLd';
import { faqSchema } from '@/lib/schema';
import { FAQ_ITEMS } from '@/lib/faq';

export const metadata: Metadata = {
  title: 'Questions fréquentes',
  description:
    "Toutes les réponses sur l'audit 360° du restaurant auditresto360 : périmètre, prix, indépendance, groupes et franchises, délais.",
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ_ITEMS)} />
      <section className="aurora">
        <div className="container-r py-16">
          <span className="eyebrow">FAQ</span>
          <h1 className="section-title mt-3">Vos questions, nos réponses</h1>
        </div>
      </section>
      <Faq />
      <CtaBand />
    </>
  );
}
