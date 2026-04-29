// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-manrope)', 'sans-serif'],
      },
      colors: {
        // Brand palette
        cream: {
          50: '#FFFAF1',
          100: '#FDF6EC',
          200: '#F6EBD9',
        },
        terracotta: {
          400: '#D87E5A',
          500: '#C9663D',
          600: '#A14E2C',
        },
        sage: {
          500: '#7A8B6F',
          600: '#5A6A50',
        },
      },
      borderRadius: {
        'sm': '14px',
        'md': '22px',
        'lg': '32px',
      },
    },
  },
  plugins: [],
};

export default config;
