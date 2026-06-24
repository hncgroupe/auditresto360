import type { Metadata } from 'next';
import { LegalLayout } from '@/components/site/LegalLayout';
import { MARQUE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Comment auditresto360 collecte et traite vos données personnelles, dans le respect du RGPD.',
  alternates: { canonical: '/confidentialite' },
  robots: { index: false, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout titre="Politique de confidentialité">
      <p>
        auditresto360 attache une grande importance à la protection de vos données personnelles, dans le respect du Règlement général sur la protection des données (RGPD) et des recommandations de la CNIL.
      </p>

      <h2 className="text-lg font-bold text-ink">Données collectées</h2>
      <p>
        Via nos formulaires, nous collectons uniquement les données nécessaires au traitement de votre demande : nom, email, téléphone, ville, et les informations de qualification de votre projet (type de projet, modules, taille, nombre d’établissements, message).
      </p>

      <h2 className="text-lg font-bold text-ink">Finalités</h2>
      <p>
        Ces données servent à vous recontacter, établir un devis et réaliser la prestation d’audit. Avec votre accord explicite (case à cocher distincte), elles peuvent aussi servir à vous adresser des conseils et actualités.
      </p>

      <h2 className="text-lg font-bold text-ink">Base légale et consentement</h2>
      <p>
        Le traitement repose sur votre consentement et sur l’exécution de mesures précontractuelles. Le consentement marketing est facultatif, recueilli par une case non pré-cochée, et révocable à tout moment.
      </p>

      <h2 className="text-lg font-bold text-ink">Durée de conservation</h2>
      <p>
        Prospects non convertis : TODO (à valider). Clients : durée de la relation contractuelle puis archivage légal. Rapports d’audit : TODO.
      </p>

      <h2 className="text-lg font-bold text-ink">Vos droits</h2>
      <p>
        Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de portabilité. Pour les exercer, écrivez à <a href={`mailto:${MARQUE.email}`} className="text-orange-700 underline">{MARQUE.email}</a>.
      </p>

      <h2 className="text-lg font-bold text-ink">Cookies</h2>
      <p>
        Aucun cookie non essentiel n’est déposé sans votre consentement. Un bandeau vous permet d’accepter ou de refuser, le refus étant aussi simple que l’acceptation.
      </p>
    </LegalLayout>
  );
}
