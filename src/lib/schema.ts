import { env } from './env';
import { PILIERS_360 } from './constants';

/**
 * Données structurées schema.org (JSON-LD).
 * Aucune note/avis (AggregateRating) tant qu'il n'y a pas de vrais avis (no-fake-content).
 */

export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${env.siteUrl}/#organization`,
    name: 'auditresto360',
    legalName: 'auditresto360',
    description:
      "Audit 360° du restaurant : hygiène HACCP, ressources humaines, conformité, gestion et comptabilité, carte et développement commercial. Audit conseil privé et indépendant.",
    url: env.siteUrl,
    logo: `${env.siteUrl}/logo-auditresto360.png`,
    image: `${env.siteUrl}/opengraph-image`,
    email: 'contact@auditresto360.fr',
    slogan: "L'audit 360° qui révèle tout le potentiel de votre restaurant.",
    areaServed: { '@type': 'Country', name: 'France' },
    knowsAbout: [
      'Audit de restaurant',
      'Hygiène alimentaire',
      'HACCP',
      'Plan de maîtrise sanitaire',
      'Conformité réglementaire en restauration',
      'Ressources humaines en restauration',
      'Gestion et comptabilité de restaurant',
      'Food cost',
      'Menu engineering',
      'Ouverture de restaurant',
      'Reprise de restaurant',
      'Franchise de restauration',
    ],
    serviceType: [
      'Audit de restaurant',
      'Audit HACCP',
      'Audit RH',
      'Audit de gestion',
      'Conseil en restauration',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@auditresto360.fr',
      contactType: 'customer support',
      areaServed: 'FR',
      availableLanguage: ['French'],
    },
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${env.siteUrl}/#website`,
    url: env.siteUrl,
    name: 'auditresto360',
    inLanguage: 'fr-FR',
    publisher: { '@id': `${env.siteUrl}/#organization` },
  };
}

export function serviceSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Audit 360° du restaurant',
    serviceType: 'Audit complet de restaurant',
    provider: { '@id': `${env.siteUrl}/#organization` },
    areaServed: { '@type': 'Country', name: 'France' },
    description:
      "Audit complet et indépendant d'un restaurant ou d'un groupe : hygiène et HACCP, conformité, ressources humaines, gestion et comptabilité, carte, performance et développement commercial. Rapport noté et plan d'action priorisé.",
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: "Modules d'audit",
      itemListElement: PILIERS_360.map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: p.nom },
      })),
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/** Fil d'Ariane structuré. items : [{ name, path }] du plus général au plus précis. */
export function breadcrumbSchema(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${env.siteUrl}${it.path}`,
    })),
  };
}
