import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Kuwex brand system — pulled directly from the logo
        // Pure black canvas, white typography, electric cyan accent (the "X").
        ink: {
          DEFAULT: '#000000',
          900: '#000000',
          800: '#0A0A0B',
          700: '#111113',
          600: '#17181B',
          500: '#1E2024',
          400: '#2A2D33',
          300: '#3A3E46',
          200: '#6B7079',
          100: '#A3A8B1',
          50: '#D5D8DE',
        },
        accent: {
          DEFAULT: '#1CA4FF',
          50: '#E6F5FF',
          100: '#BFE5FF',
          200: '#8CD1FF',
          300: '#5CBEFF',
          400: '#33ADFF',
          500: '#1CA4FF',
          600: '#0088E6',
          700: '#006BB8',
          800: '#004F8A',
          900: '#00335C',
        },
        // Backwards-compat aliases (so existing class names still work)
        brand: {
          DEFAULT: '#000000',
          50: '#F5F6F7',
          100: '#E6E8EB',
          500: '#17181B',
          600: '#0A0A0B',
          700: '#000000',
          900: '#000000',
        },
        wa: {
          bg: '#000000',
          panel: '#0A0A0B',
          chat: '#000000',
          bubbleIn: '#17181B',
          bubbleOut: '#0B3A5C',
          text: '#F5F6F7',
          muted: '#6B7079',
          tick: '#1CA4FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        bubble: '0 1px 0.5px rgba(0,0,0,0.13)',
        glow: '0 0 0 1px rgba(28,164,255,0.15), 0 8px 40px -8px rgba(28,164,255,0.35)',
        'glow-lg': '0 0 0 1px rgba(28,164,255,0.25), 0 20px 80px -20px rgba(28,164,255,0.6)',
      },
      backgroundImage: {
        'radial-accent': 'radial-gradient(circle at 50% 0%, rgba(28,164,255,0.25), transparent 60%)',
        'grid-dark': "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(28,164,255,0.4)' },
          '50%': { boxShadow: '0 0 0 14px rgba(28,164,255,0)' },
        },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
