/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F28C38',
          hover: '#E27925',
          light: '#FDEEE2',
          dark: '#BA5E14'
        },
        secondary: {
          DEFAULT: '#2F6B4F',
          hover: '#25553E',
          light: '#EAF3EE',
          dark: '#1C402F'
        },
        cream: {
          DEFAULT: '#FFF9F1',
          50: '#FFFCF8',
          100: '#FFF9F1',
          200: '#FDF2E2',
          300: '#F8E6CD'
        },
        accent: {
          DEFAULT: '#FFD166',
          hover: '#F5C24D',
          light: '#FFF5DC'
        },
        charcoal: {
          DEFAULT: '#252525',
          light: '#4A4A4A',
          muted: '#737373',
          border: '#E5E5E5'
        },
        emergency: {
          DEFAULT: '#D64545',
          hover: '#C03535',
          light: '#FDE8E8',
          dark: '#962020'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(37, 37, 37, 0.06), 0 2px 6px -1px rgba(37, 37, 37, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(37, 37, 37, 0.08), 0 4px 10px -2px rgba(37, 37, 37, 0.05)',
        'warm': '0 10px 25px -5px rgba(242, 140, 56, 0.2), 0 8px 10px -6px rgba(242, 140, 56, 0.15)'
      }
    },
  },
  plugins: [],
}
