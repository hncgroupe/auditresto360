import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Marque auditresto360 : orange + noir (d'après le logo).
        orange: {
          DEFAULT: '#FF7A00',
          50: '#FFF4EA',
          100: '#FFE6CC',
          200: '#FFCB99',
          300: '#FFAD5C',
          400: '#FF9226',
          500: '#FF7A00',
          600: '#E66A00',
          700: '#C25500',
          800: '#8F3F00',
          900: '#5C2900',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          light: '#1C1C1C',
        },
        gris: {
          DEFAULT: '#6B7280',
          light: '#9AA1AB',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(10, 10, 10, 0.14)',
        card: '0 2px 16px -4px rgba(10, 10, 10, 0.10)',
        glow: '0 12px 34px -12px rgba(255, 122, 0, 0.55)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
