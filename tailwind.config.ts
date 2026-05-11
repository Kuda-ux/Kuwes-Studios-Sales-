import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1E1B4B',
          50: '#EEF0FF',
          100: '#D9DCFF',
          500: '#3F3DAE',
          600: '#2E2C8C',
          700: '#1E1B4B',
          900: '#0F0D2B',
        },
        accent: {
          DEFAULT: '#10B981',
          500: '#10B981',
          600: '#059669',
        },
        wa: {
          bg: '#0B141A',
          panel: '#111B21',
          chat: '#0B141A',
          bubbleIn: '#202C33',
          bubbleOut: '#005C4B',
          text: '#E9EDEF',
          muted: '#8696A0',
          tick: '#53BDEB',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        bubble: '0 1px 0.5px rgba(0,0,0,0.13)',
      },
    },
  },
  plugins: [],
};
export default config;
