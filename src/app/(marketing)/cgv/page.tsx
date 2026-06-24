import type { Metadata } from 'next';
import { LegalLayout } from '@/components/site/LegalLayout';
import { MENTION_INDEPENDANCE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description: 'Conditions générales de vente des prestations d’audit auditresto360.',
  alternates: { canonical: '/cgv' },
  robots: { index: false, follow: true },
};

export default function CgvPage() {
  return (
    <LegalLayout titre="Conditions générales de vente">
      <p className="rounded-xl border border-orange/20 bg-orange-50/60 p-4 text-sm">
        Document de cadrage. Le contenu juridique définitif (prix, modalités, délais de rétractation, garanties) doit être validé avant mise en ligne. {/* TODO : validation juridique */}
      </p>

      <h2 className="text-lg font-bold text-ink">Objet</h2>
      <p>
        Les présentes conditions régissent les prestations d’audit réalisées par auditresto360 : audit 360° complet ou modules ciblés, audit multi-sites, pour les restaurants et groupes de restauration.
      </p>

      <h2 className="text-lg font-bold text-ink">Devis et commande</h2>
      <p>
        Toute prestation fait l’objet d’un devis personnalisé. La commande est ferme à l’acceptation écrite du devis. TODO : acompte, modalités.
      </p>

      <h2 className="text-lg font-bold text-ink">Prix et paiement</h2>
      <p>
        Les prix sont indiqués hors taxes. Le paiement en plusieurs fois est possible. TODO : échéances, moyens de paiement, pénalités de retard.
      </p>

      <h2 className="text-lg font-bold text-ink">Déroulement de la prestation</h2>
      <p>
        L’audit se déroule sur place selon le périmètre convenu. Le client facilite l’accès aux locaux et aux documents nécessaires. Un rapport est remis à l’issue de l’intervention.
      </p>

      <h2 className="text-lg font-bold text-ink">Nature et limites</h2>
      <p>{MENTION_INDEPENDANCE}</p>

      <h2 className="text-lg font-bold text-ink">Confidentialité</h2>
      <p>
        Les constats, le rapport et les données communiquées restent strictement confidentiels.
      </p>
    </LegalLayout>
  );
}
