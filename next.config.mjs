/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Le typage est vérifié au build ; ESLint ne doit pas faire échouer le déploiement
  // (les warnings deviennent des erreurs en CI sur Vercel). On lint séparément.
  eslint: { ignoreDuringBuilds: true },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // auditresto360.com → auditresto360.fr (301)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'auditresto360.com' }],
        destination: 'https://auditresto360.fr/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.auditresto360.com' }],
        destination: 'https://auditresto360.fr/:path*',
        permanent: true,
      },
      // www → apex (canonique)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.auditresto360.fr' }],
        destination: 'https://auditresto360.fr/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
