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
