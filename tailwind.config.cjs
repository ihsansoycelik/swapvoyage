/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './*.tsx',
    './components/**/*.{ts,tsx}',
    './services/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          purple: '#A855F7',
          lavender: '#C4B5FD',
          black: '#080808',
          gray: '#949494',
          offwhite: '#F9F9F9',
          'dark-bg': '#000000',
          'dark-card': '#1C1C1E',
          'dark-border': '#2C2C2E',
        },
      },
    },
  },
  safelist: [
    'duration-[10s]',
    'ease-[cubic-bezier(0.19,1,0.22,1)]',
    'ease-[cubic-bezier(0.32,0.72,0,1)]',
    'ease-[cubic-bezier(0.32,0,0.2,1)]',
    'duration-400',
  ],
  plugins: [require('tailwindcss-animate')],
};
