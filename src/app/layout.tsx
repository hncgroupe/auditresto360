import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { env } from '@/lib/env';
import { JsonLd } from '@/components/site/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/schema';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auditresto360.fr';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'auditresto360 - L’audit 360° complet de votre restaurant',
    template: '%s | auditresto360',
  },
  description:
    "auditresto360 réalise l'audit complet et indépendant de votre restaurant : hygiène HACCP, ressources humaines, conformité, gestion et comptabilité, carte et développement commercial. Rapport noté, points critiques, plan d'action priorisé.",
  applicationName: 'auditresto360',
  authors: [{ name: 'auditresto360' }],
  creator: 'auditresto360',
  publisher: 'auditresto360',
  category: 'Audit et conseil en restauration',
  keywords: [
    'audit restaurant',
    'audit complet restaurant',
    'audit HACCP restaurant',
    'audit RH restaurant',
    'audit gestion restaurant',
    'audit ouverture restaurant',
    'audit reprise restaurant',
    'audit franchise restauration',
    'conseil restauration',
  ],
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'auditresto360',
    title: 'auditresto360 - L’audit 360° complet de votre restaurant',
    description:
      "Hygiène, RH, conformité, gestion, carte, commercial : l'audit complet et indépendant de votre restaurant ou de votre groupe. Rapport noté et plan d'action.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'auditresto360 - L’audit 360° du restaurant',
    description:
      "L'audit complet et indépendant de votre restaurant : hygiène, RH, conformité, gestion, carte, commercial.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: env.googleSiteVerification,
    other: env.bingSiteVerification ? { 'msvalidate.01': env.bingSiteVerification } : {},
  },
};

export const viewport: Viewport = {
  themeColor: '#FF7A00',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={poppins.variable}>
      <body className="font-sans antialiased">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {children}
      </body>
    </html>
  );
}
