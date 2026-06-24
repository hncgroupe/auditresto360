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
      <h2 className="text-lg font-bold text-ink">Prestataire</h2>
      <p>
        Les prestations sont fournies par <strong>HNC</strong>, SAS, siège social 26 rue Bosquet, 75007 Paris, immatriculée au RCS de Paris sous le numéro 985 221 324, sous la marque auditresto360. Contact : contact@auditresto360.fr.
      </p>

      <h2 className="text-lg font-bold text-ink">Objet</h2>
      <p>
        Les présentes conditions régissent les prestations d’audit de restaurant réalisées sous la marque auditresto360 pour des clients professionnels : Audit conformité, Audit 360° complet, et audit multi-sites pour les groupes et réseaux.
      </p>

      <h2 className="text-lg font-bold text-ink">Devis et commande</h2>
      <p>
        Toute prestation fait l’objet d’un devis. La commande devient ferme à l’acceptation écrite du devis par le client. Les prestations s’adressant à des professionnels dans le cadre de leur activité, le droit de rétractation des consommateurs ne s’applique pas.
      </p>

      <h2 className="text-lg font-bold text-ink">Prix et paiement</h2>
      <p>
        Les tarifs pour un établissement sont de 690 € pour l’Audit conformité et de 1 390 € pour l’Audit 360° complet. TVA non applicable, article 293 B du CGI. Les audits de groupe ou multi-sites font l’objet d’un devis sur mesure. Le paiement en plusieurs fois est possible selon les modalités convenues au devis.
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
