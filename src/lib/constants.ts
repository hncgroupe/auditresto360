/** Constantes de marque — auditresto360. */

export const MARQUE = {
  nom: 'auditresto360',
  baseline: "L'audit 360° qui révèle tout le potentiel de votre restaurant.",
  orange: '#FF7A00',
  ink: '#0A0A0A',
  email: 'contact@auditresto360.fr',
  telephone: '', // TODO : numéro à renseigner
} as const;

/**
 * Mention de cadre : auditresto360 est un diagnostic privé et indépendant.
 * À afficher en footer et au pied des documents.
 */
export const MENTION_INDEPENDANCE =
  "auditresto360 est un audit conseil privé et indépendant. Il ne constitue ni une certification officielle, ni un agrément d'État, ni un contrôle des services vétérinaires/DDPP. Notre rapport vous aide à anticiper et à progresser, sans garantir le résultat d'un contrôle officiel.";

/**
 * Avis Trustpilot auditresto360. Doivent correspondre à de VRAIS avis (no-fake-content).
 * note : sur 5. nbAvis : null tant que le nombre réel n'est pas fourni (n'affiche pas le compte).
 * url : lien public de la page Trustpilot (TODO à fournir pour rendre les étoiles cliquables).
 */
export const TRUSTPILOT = {
  note: 4.8,
  nbAvis: null as number | null, // TODO : nombre réel d'avis
  url: '' as string, // TODO : https://fr.trustpilot.com/review/auditresto360.fr
} as const;

/**
 * Lead magnet : exemple de rapport d'audit à télécharger contre un email.
 * fileUrl : vide pour l'instant. Dès qu'un PDF est déposé dans /public et l'URL
 * renseignée ici, la rubrique propose un téléchargement direct ; sinon le document
 * est annoncé comme envoyé par email.
 */
export const LEAD_MAGNET = {
  titre: 'Exemple de rapport d’audit auditresto360',
  fileUrl: '' as string, // TODO : '/exemple-rapport-auditresto360.pdf'
} as const;

/** Les 10 piliers de l'audit 360 (alignés sur la grille terrain auditresto360). */
export const PILIERS_360 = [
  { code: 'P1', nom: 'Accueil & expérience client', icone: '🛎️' },
  { code: 'P2', nom: 'Cuisine & production', icone: '👨‍🍳' },
  { code: 'P3', nom: 'Réserve & stockage', icone: '📦' },
  { code: 'P4', nom: 'HACCP & conformité', icone: '🧪' },
  { code: 'P5', nom: 'Ressources humaines', icone: '👥' },
  { code: 'P6', nom: 'Performance opérationnelle', icone: '⚙️' },
  { code: 'P7', nom: 'Gestion & comptabilité', icone: '📊' },
  { code: 'P8', nom: 'Développement commercial', icone: '📈' },
  { code: 'P9', nom: 'Outils & pilotage', icone: '🧭' },
  { code: 'P10', nom: 'Vision du dirigeant', icone: '🎯' },
] as const;
