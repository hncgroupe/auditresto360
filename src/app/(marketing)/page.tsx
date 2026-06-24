import { Hero } from '@/components/marketing/Hero';
import { TrustBar } from '@/components/marketing/TrustBar';
import { Probleme } from '@/components/marketing/Probleme';
import { Piliers } from '@/components/marketing/Piliers';
import { PourQui } from '@/components/marketing/PourQui';
import { Expertise } from '@/components/marketing/Expertise';
import { Deroule } from '@/components/marketing/Deroule';
import { Configurateur } from '@/components/marketing/Configurateur';
import { Tarifs } from '@/components/marketing/Tarifs';
import { Faq } from '@/components/marketing/Faq';
import { Groupe } from '@/components/marketing/Groupe';
import { CtaBand } from '@/components/marketing/CtaBand';
import { StickyCta } from '@/components/marketing/StickyCta';
import { JsonLd } from '@/components/site/JsonLd';
import { serviceSchema, faqSchema } from '@/lib/schema';
import { FAQ_ITEMS } from '@/lib/faq';

export default function HomePage() {
  return (
    <>
      <JsonLd data={serviceSchema()} />
      <JsonLd data={faqSchema(FAQ_ITEMS)} />
      <Hero />
      <TrustBar />
      <Probleme />
      <Piliers />
      <Expertise />
      <PourQui />
      <Deroule />
      <Configurateur />
      <Tarifs />
      <Faq />
      <Groupe />
      <CtaBand />
      <StickyCta />
    </>
  );
}
