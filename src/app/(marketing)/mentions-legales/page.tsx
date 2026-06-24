import type { Metadata } from 'next';
import { LegalLayout } from '@/components/site/LegalLayout';
import { MARQUE, MENTION_INDEPENDANCE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site auditresto360.',
  alternates: { canonical: '/mentions-legales' },
  robots: { index: false, follow: true },
};

export default function MentionsPage() {
  return (
    <LegalLayout titre="Mentions légales">
      <h2 className="text-lg font-bold text-ink">Éditeur du site</h2>
      <p>
        auditresto360{/* TODO : raison sociale exacte */}.<br />
        Forme juridique : TODO.<br />
        Capital social : TODO.<br />
        Siège social : TODO.<br />
        SIREN / SIRET : TODO.<br />
        Numéro de TVA intracommunautaire : TODO.<br />
        Email : {MARQUE.email}.<br />
        Directeur de la publication : TODO.
      </p>

      <h2 className="text-lg font-bold text-ink">Hébergement</h2>
      <p>
        Site hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
      </p>

      <h2 className="text-lg font-bold text-ink">Propriété intellectuelle</h2>
      <p>
        L’ensemble des contenus de ce site (textes, visuels, logo, méthode d’audit) est protégé. Toute reproduction sans autorisation est interdite.
      </p>

      <h2 className="text-lg font-bold text-ink">Nature du service</h2>
      <p>{MENTION_INDEPENDANCE}</p>
    </LegalLayout>
  );
}
