import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './app/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary blue sky colors
        'sky-light': '#B3E5FC',
        'sky-main': '#81D4FA',
        'sky-dark': '#4FC3F7',
        'sky-darker': '#29B6F6',

        // Secondary accent colors
        'accent-yellow': '#FDB927',
        'accent-orange': '#FF9800',
        'accent-gold': '#FFC107',

        // Dark navy for text and sections
        'navy-dark': '#1A3A52',
        'navy-main': '#2C5282',
        'navy-light': '#4A90E2',

        // Neutral colors
        'cloud-white': '#F8FBFF',
        'cloud-light': '#E3F2FD',
      },
      backgroundImage: {
        'sky-gradient': 'linear-gradient(135deg, #B3E5FC 0%, #81D4FA 100%)',
        'sky-to-navy': 'linear-gradient(180deg, #81D4FA 0%, #4A90E2 100%)',
        'hero-gradient': 'linear-gradient(180deg, #B3E5FC 0%, rgba(179, 229, 252, 0.5) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1' }],
        'section-title': ['2.5rem', { lineHeight: '1.2' }],
        'card-title': ['1.5rem', { lineHeight: '1.3' }],
      },
      borderRadius: {
        'xl': '1rem',
        'card': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 12px 30px rgba(0, 0, 0, 0.15)',
        'button': '0 4px 15px rgba(129, 212, 250, 0.4)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
