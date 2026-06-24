import { env } from './env';

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
    description:
      "Audit 360° du restaurant : hygiène HACCP, ressources humaines, conformité, gestion et comptabilité, carte et développement commercial. Audit conseil privé et indépendant.",
    url: env.siteUrl,
    email: 'contact@auditresto360.fr',
    areaServed: { '@type': 'Country', name: 'France' },
    serviceType: [
      'Audit de restaurant',
      'Audit HACCP',
      'Audit RH',
      'Audit de gestion',
      'Conseil en restauration',
    ],
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
