/**
 * Données et moteur d'estimation du configurateur auditresto360.
 *
 * ⚠️ Les prix ci-dessous sont des PROPOSITIONS de cadrage (marqués TODO) destinées
 * à produire une estimation indicative. Ils doivent être validés par le client
 * avant mise en production (voir rule methodology-guard / no-fake-content).
 * Le site présente toujours le résultat comme une « estimation indicative »,
 * le devis final étant personnalisé.
 */

export interface Projet {
  id: 'EXPLOITATION' | 'LANCEMENT' | 'REPRISE' | 'GROUPE';
  label: string;
  desc: string;
  /** Coefficient appliqué à l'estimation. */
  mult: number;
  /** true = bascule en « sur devis » (pas de chiffre affiché). */
  surDevis?: boolean;
}

export const PROJETS: Projet[] = [
  {
    id: 'EXPLOITATION',
    label: 'Restaurant en activité',
    desc: 'Diagnostic 360° complet d’un établissement déjà ouvert.',
    mult: 1,
  },
  {
    id: 'LANCEMENT',
    label: 'Ouverture / création',
    desc: 'Cadrer et sécuriser un lancement avant l’ouverture.',
    mult: 1.15, // TODO valider
  },
  {
    id: 'REPRISE',
    label: 'Reprise / rachat',
    desc: 'Audit avant de racheter ou de reprendre un fonds.',
    mult: 1.1, // TODO valider
  },
  {
    id: 'GROUPE',
    label: 'Groupe & franchise',
    desc: 'Multi-sites, structuration, têtes de réseau et franchisés.',
    mult: 1,
    surDevis: true,
  },
];

export interface ModuleAudit {
  id: string;
  label: string;
  desc: string;
  /** Prix unitaire indicatif pour un établissement standard. TODO valider. */
  prix: number;
}

/** Modules d'audit. Tout sélectionner = « Audit 360° complet » (remise bundle). */
export const MODULES: ModuleAudit[] = [
  { id: 'haccp', label: 'Hygiène, HACCP & conformité', desc: 'PMS, traçabilité, températures, affichages, réserve.', prix: 390 },
  { id: 'cuisine', label: 'Cuisine & production', desc: 'Organisation des postes, fiches techniques, dressage.', prix: 290 },
  { id: 'experience', label: 'Salle & expérience client', desc: 'Accueil, propreté, service, ambiance, parcours client.', prix: 240 },
  { id: 'rh', label: 'Ressources humaines & social', desc: 'Plannings, contrats, climat, formation, polyvalence.', prix: 320 },
  { id: 'gestion', label: 'Gestion, comptabilité & food cost', desc: 'Marges, coût matière, caisse, stocks, inventaires.', prix: 360 },
  { id: 'carte', label: 'Carte & rentabilité', desc: 'Lisibilité, cohérence, menu engineering, plats rentables.', prix: 240 },
  { id: 'commercial', label: 'Commercial & digital', desc: 'Plateformes (Uber, Deliveroo), avis, ticket moyen, offres.', prix: 240 },
  { id: 'pilotage', label: 'Performance, outils & pilotage', desc: 'Fluidité du service, logiciels, tableaux de bord, KPI.', prix: 230 },
];

/** Remise appliquée quand tous les modules sont retenus (audit 360 complet). TODO valider. */
export const REMISE_BUNDLE = 0.2;

export interface Taille {
  id: 'PETIT' | 'STANDARD' | 'GRAND';
  label: string;
  desc: string;
  mult: number;
}

export const TAILLES: Taille[] = [
  { id: 'PETIT', label: 'Petit', desc: 'Moins de 40 couverts', mult: 1 },
  { id: 'STANDARD', label: 'Standard', desc: '40 à 100 couverts', mult: 1.25 }, // TODO valider
  { id: 'GRAND', label: 'Grand / gastronomique', desc: 'Plus de 100 couverts', mult: 1.6 }, // TODO valider
];

export interface NbEtab {
  id: '1' | '2-3' | '4-9' | '10+';
  label: string;
  /** Nombre représentatif pour le calcul. */
  count: number;
  /** Remise volume par établissement. */
  remise: number;
  surDevis?: boolean;
}

export const NB_ETABLISSEMENTS: NbEtab[] = [
  { id: '1', label: '1 établissement', count: 1, remise: 0 },
  { id: '2-3', label: '2 à 3', count: 2, remise: 0.1 }, // TODO valider
  { id: '4-9', label: '4 à 9', count: 4, remise: 0.2 }, // TODO valider
  { id: '10+', label: '10 et plus', count: 10, remise: 0.3, surDevis: true },
];

export interface Estimation {
  /** Fourchette basse / haute en euros (HT). */
  min: number;
  max: number;
  /** Audit 360 complet ou modules ciblés. */
  complet: boolean;
  /** true si le contexte impose un devis (groupe, 10+ établissements). */
  surDevis: boolean;
  /** Total d'établissements pris en compte. */
  count: number;
}

/** Arrondi à la dizaine d'euros la plus proche. */
function round10(n: number): number {
  return Math.round(n / 10) * 10;
}

/**
 * Calcule une estimation indicative à partir des choix du configurateur.
 * Renvoie null tant que le minimum requis (modules + taille) n'est pas saisi.
 */
export function estimer(input: {
  projet?: string;
  modules: string[];
  taille?: string;
  nbEtab?: string;
}): Estimation | null {
  const mods = MODULES.filter((m) => input.modules.includes(m.id));
  const taille = TAILLES.find((t) => t.id === input.taille);
  if (mods.length === 0 || !taille) return null;

  const projet = PROJETS.find((p) => p.id === input.projet);
  const nb = NB_ETABLISSEMENTS.find((n) => n.id === input.nbEtab) ?? NB_ETABLISSEMENTS[0];
  const complet = mods.length === MODULES.length;

  // Base : somme des modules, remise bundle si audit complet.
  let base = mods.reduce((sum, m) => sum + m.prix, 0);
  if (complet) base *= 1 - REMISE_BUNDLE;

  // Taille de l'établissement et nature du projet.
  base *= taille.mult;
  base *= projet?.mult ?? 1;

  // Volume (par établissement, dégressif).
  const total = base * nb.count * (1 - nb.remise);

  const surDevis = Boolean(projet?.surDevis || nb.surDevis);

  // Fourchette indicative ± 12 %.
  return {
    min: round10(total * 0.88),
    max: round10(total * 1.12),
    complet,
    surDevis,
    count: nb.count,
  };
}

/** Formatage euros sans décimales (ex : 1 990 €). */
export function euros(n: number): string {
  return new Intl.NumberFormat('fr-FR').format(n) + ' €';
}

export function labelProjet(id?: string): string | undefined {
  return PROJETS.find((p) => p.id === id)?.label;
}
export function labelTaille(id?: string): string | undefined {
  return TAILLES.find((t) => t.id === id)?.label;
}
export function labelNbEtab(id?: string): string | undefined {
  return NB_ETABLISSEMENTS.find((n) => n.id === id)?.label;
}
export function labelsModules(ids: string[]): string[] {
  return MODULES.filter((m) => ids.includes(m.id)).map((m) => m.label);
}
