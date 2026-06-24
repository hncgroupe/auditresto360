/**
 * Villes ciblées pour le SEO local (pages /audit-restaurant/[ville]).
 * Chaque ville porte une accroche unique (pas de contenu dupliqué, aucune stat inventée).
 */

export interface Ville {
  slug: string;
  nom: string;
  /** Préposition correcte : "à Paris", "au Havre", "aux …". */
  prep: string;
  departement: string;
  depCode: string;
  region: string;
  /** Accroche unique : contexte local de la restauration. */
  angle: string;
}

export const VILLES: Ville[] = [
  { slug: 'paris', nom: 'Paris', prep: 'à', departement: 'Paris', depCode: '75', region: 'Île-de-France', angle: 'Capitale de la restauration française, Paris concentre une densité de tables et une exigence clientèle qui ne pardonnent ni un écart d’hygiène ni une carte mal pensée.' },
  { slug: 'boulogne-billancourt', nom: 'Boulogne-Billancourt', prep: 'à', departement: 'Hauts-de-Seine', depCode: '92', region: 'Île-de-France', angle: 'Aux portes de Paris, la restauration de Boulogne-Billancourt vit au rythme des bureaux et des familles, avec une clientèle pressée le midi et plus posée le soir.' },
  { slug: 'saint-denis', nom: 'Saint-Denis', prep: 'à', departement: 'Seine-Saint-Denis', depCode: '93', region: 'Île-de-France', angle: 'Entre flux du Stade de France et restauration de quartier, Saint-Denis mélange les formats et les volumes, ce qui met l’organisation et l’hygiène à rude épreuve.' },
  { slug: 'versailles', nom: 'Versailles', prep: 'à', departement: 'Yvelines', depCode: '78', region: 'Île-de-France', angle: 'Ville touristique et résidentielle, Versailles attend des établissements une tenue irréprochable, du service à la propreté, à la hauteur de son image.' },
  { slug: 'creteil', nom: 'Créteil', prep: 'à', departement: 'Val-de-Marne', depCode: '94', region: 'Île-de-France', angle: 'Pôle administratif et commercial du Val-de-Marne, Créteil fait tourner une restauration de flux où la régularité et la maîtrise des coûts font la différence.' },
  { slug: 'nanterre', nom: 'Nanterre', prep: 'à', departement: 'Hauts-de-Seine', depCode: '92', region: 'Île-de-France', angle: 'Proche de La Défense, Nanterre vit sur la pause déjeuner des actifs : rapidité, hygiène et rentabilité au mètre carré y sont décisives.' },
  { slug: 'montreuil', nom: 'Montreuil', prep: 'à', departement: 'Seine-Saint-Denis', depCode: '93', region: 'Île-de-France', angle: 'Montreuil cultive une scène food jeune et bistronomique, où la créativité de la carte doit composer avec une gestion rigoureuse pour durer.' },
  { slug: 'lyon', nom: 'Lyon', prep: 'à', departement: 'Rhône', depCode: '69', region: 'Auvergne-Rhône-Alpes', angle: 'Capitale gastronomique, Lyon place la barre haut : bouchons, bistrots et tables modernes y sont jugés sur la constance, en cuisine comme sur l’hygiène.' },
  { slug: 'marseille', nom: 'Marseille', prep: 'à', departement: 'Bouches-du-Rhône', depCode: '13', region: 'Provence-Alpes-Côte d’Azur', angle: 'Entre Vieux-Port et quartiers populaires, la restauration marseillaise vit de saisonnalité et de produits frais, ce qui exige une chaîne du froid sans faille.' },
  { slug: 'toulouse', nom: 'Toulouse', prep: 'à', departement: 'Haute-Garonne', depCode: '31', region: 'Occitanie', angle: 'Ville étudiante et dynamique, Toulouse fait vivre une restauration de volume où le food cost et l’organisation du service décident de la marge.' },
  { slug: 'nice', nom: 'Nice', prep: 'à', departement: 'Alpes-Maritimes', depCode: '06', region: 'Provence-Alpes-Côte d’Azur', angle: 'Forte affluence touristique, saisonnalité marquée : à Nice, tenir l’hygiène et la qualité en plein rush estival est un vrai test pour les équipes.' },
  { slug: 'nantes', nom: 'Nantes', prep: 'à', departement: 'Loire-Atlantique', depCode: '44', region: 'Pays de la Loire', angle: 'Nantes conjugue scène bistronomique et restauration de quartier, avec une clientèle attentive à la qualité du produit comme à l’expérience.' },
  { slug: 'montpellier', nom: 'Montpellier', prep: 'à', departement: 'Hérault', depCode: '34', region: 'Occitanie', angle: 'Climat, terrasses et clientèle étudiante : à Montpellier, la gestion des flux et la maîtrise sanitaire en extérieur sont au cœur du métier.' },
  { slug: 'strasbourg', nom: 'Strasbourg', prep: 'à', departement: 'Bas-Rhin', depCode: '67', region: 'Grand Est', angle: 'Entre winstubs traditionnelles et tables contemporaines, Strasbourg attend des établissements une rigueur à la hauteur de sa réputation gastronomique.' },
  { slug: 'bordeaux', nom: 'Bordeaux', prep: 'à', departement: 'Gironde', depCode: '33', region: 'Nouvelle-Aquitaine', angle: 'Ville de vin et de gastronomie, Bordeaux fait grimper les attentes : carte, accords et tenue de salle y sont scrutés autant que l’assiette.' },
  { slug: 'lille', nom: 'Lille', prep: 'à', departement: 'Nord', depCode: '59', region: 'Hauts-de-France', angle: 'Estaminets, brasseries et nouvelle cuisine : Lille vit d’une restauration conviviale et de volume où l’organisation tient toute la rentabilité.' },
  { slug: 'rennes', nom: 'Rennes', prep: 'à', departement: 'Ille-et-Vilaine', depCode: '35', region: 'Bretagne', angle: 'Ville jeune et étudiante, Rennes fait tourner crêperies, bistrots et tables modernes, avec une clientèle sensible au rapport qualité-prix.' },
  { slug: 'reims', nom: 'Reims', prep: 'à', departement: 'Marne', depCode: '51', region: 'Grand Est', angle: 'Capitale du champagne, Reims attire une clientèle d’affaires et de tourisme exigeante, où la tenue de l’établissement compte autant que la cave.' },
  { slug: 'grenoble', nom: 'Grenoble', prep: 'à', departement: 'Isère', depCode: '38', region: 'Auvergne-Rhône-Alpes', angle: 'Entre clientèle étudiante et tourisme de montagne, Grenoble impose une restauration souple, capable d’absorber des pics d’affluence sans lâcher sur l’hygiène.' },
  { slug: 'dijon', nom: 'Dijon', prep: 'à', departement: 'Côte-d’Or', depCode: '21', region: 'Bourgogne-Franche-Comté', angle: 'Terre de gastronomie, Dijon attend de ses tables une cohérence entre tradition culinaire, qualité produit et maîtrise des fondamentaux d’hygiène.' },
  { slug: 'angers', nom: 'Angers', prep: 'à', departement: 'Maine-et-Loire', depCode: '49', region: 'Pays de la Loire', angle: 'Ville à la qualité de vie reconnue, Angers fait vivre une restauration de proximité où la régularité et l’accueil fidélisent la clientèle.' },
  { slug: 'tours', nom: 'Tours', prep: 'à', departement: 'Indre-et-Loire', depCode: '37', region: 'Centre-Val de Loire', angle: 'Au cœur du Val de Loire, Tours marie tourisme, vignobles et clientèle locale, avec des attentes fortes sur le produit et la tenue de salle.' },
  { slug: 'aix-en-provence', nom: 'Aix-en-Provence', prep: 'à', departement: 'Bouches-du-Rhône', depCode: '13', region: 'Provence-Alpes-Côte d’Azur', angle: 'Terrasses, tourisme et clientèle aisée : à Aix-en-Provence, l’expérience client et la maîtrise sanitaire en extérieur sont déterminantes.' },
  { slug: 'annecy', nom: 'Annecy', prep: 'à', departement: 'Haute-Savoie', depCode: '74', region: 'Auvergne-Rhône-Alpes', angle: 'Destination touristique prisée, Annecy concentre une forte saisonnalité où tenir la qualité et l’hygiène au plus fort de l’affluence fait la réputation.' },
];

export function getVille(slug: string): Ville | undefined {
  return VILLES.find((v) => v.slug === slug);
}
