import type { Metadata } from 'next';
import { ContactForm } from '@/components/marketing/ContactForm';
import { MARQUE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez auditresto360 pour un audit complet de votre restaurant ou de votre groupe. Réponse rapide, devis personnalisé, sans engagement.",
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <section className="container-r py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="eyebrow">Contact</span>
          <h1 className="section-title mt-3">Parlons de votre restaurant</h1>
          <p className="mt-4 text-lg text-ink/75">
            Une question, un projet d’audit, un groupe à auditer ? Écrivez-nous : nous revenons vers vous rapidement avec les prochaines étapes et un devis personnalisé.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <div>
              <p className="font-semibold text-ink">Email</p>
              <a href={`mailto:${MARQUE.email}`} className="text-orange-700 hover:underline">{MARQUE.email}</a>
            </div>
            <div>
              <p className="font-semibold text-ink">Chat en direct</p>
              <p className="text-ink/70">Disponible en bas à droite de votre écran.</p>
            </div>
            <div>
              <p className="font-semibold text-ink">Zone d’intervention</p>
              <p className="text-ink/70">Partout en France. {/* TODO : préciser secteurs prioritaires */}</p>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
