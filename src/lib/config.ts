/**
 * Données du configurateur auditresto360.
 * Prix réels validés par le client. auditresto360 n'est pas assujetti à la TVA
 * (TVA non applicable, article 293 B du CGI) : les prix sont nets.
 */

export const TVA_MENTION = 'TVA non applicable, art. 293 B du CGI';

export interface Formule {
  id: 'CONFORMITE' | 'COMPLET';
  nom: string;
  prix: number;
  resume: string;
  inclus: string[];
  populaire?: boolean;
}

export const FORMULES: Formule[] = [
  {
    id: 'CONFORMITE',
    nom: 'Audit conformité',
    prix: 690,
    resume: 'Hygiène, HACCP et conformité réglementaire.',
    inclus: [
      'Audit hygiène, HACCP et conformité',
      'PMS, températures, traçabilité, nettoyage',
      'Affichages et obligations réglementaires',
      'Cas critiques signalés à part',
      "Rapport noté + plan d'action conformité",
    ],
  },
  {
    id: 'COMPLET',
    nom: 'Audit 360° complet',
    prix: 1390,
    resume: 'Le diagnostic complet du restaurant, les 10 piliers.',
    inclus: [
      'Les 10 piliers audités',
      'Hygiène, cuisine, réserve, RH, gestion',
      'Carte, commercial, performance, outils',
      'Entretien dirigeant',
      'Score global et par pilier',
      "Plan d'action priorisé complet",
    ],
    populaire: true,
  },
];

export function getFormule(id?: string): Formule | undefined {
  return FORMULES.find((f) => f.id === id);
}

export interface Projet {
  id: 'EXPLOITATION' | 'LANCEMENT' | 'REPRISE' | 'GROUPE';
  label: string;
  desc: string;
}

export const PROJETS: Projet[] = [
  { id: 'EXPLOITATION', label: 'Restaurant en activité', desc: 'Diagnostic d’un établissement déjà ouvert.' },
  { id: 'LANCEMENT', label: 'Ouverture / création', desc: 'Sécuriser un lancement avant l’ouverture.' },
  { id: 'REPRISE', label: 'Reprise / rachat', desc: 'Auditer avant de racheter ou reprendre.' },
  { id: 'GROUPE', label: 'Groupe & franchise', desc: 'Multi-sites, réseau, franchisés.' },
];

export interface Taille {
  id: 'PETIT' | 'STANDARD' | 'GRAND';
  label: string;
  desc: string;
}

export const TAILLES: Taille[] = [
  { id: 'PETIT', label: 'Petit', desc: 'Moins de 40 couverts' },
  { id: 'STANDARD', label: 'Standard', desc: '40 à 100 couverts' },
  { id: 'GRAND', label: 'Grand / gastronomique', desc: 'Plus de 100 couverts' },
];

export interface NbEtab {
  id: '1' | '2-3' | '4-9' | '10+';
  label: string;
  /** true = étude multi-sites sur devis (pas de prix unitaire affiché). */
  surDevis: boolean;
}

export const NB_ETABLISSEMENTS: NbEtab[] = [
  { id: '1', label: '1 établissement', surDevis: false },
  { id: '2-3', label: '2 à 3', surDevis: true },
  { id: '4-9', label: '4 à 9', surDevis: true },
  { id: '10+', label: '10 et plus', surDevis: true },
];

/** Formatage euros sans décimales (ex : 1 390 €). */
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
