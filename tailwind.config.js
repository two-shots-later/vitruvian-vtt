/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'crimson' : ['CrimsonPro', 'serif'],
    },
    extend: {
      colors: {
        red : {
          50 : '#ffc5cd',
          100 : '#ff9db1',
          200 : '#ff7598',
          300 : '#ff5183',
          400 : '#fe2b71',
          500 : '#ff0466',
          600 : '#d6004f',
          700 : '#ab033c',
          800 : '#81022b',
          900 : '#59021b',
          accent : "#59dfaa"
        },
        green : {
          50 : '#e7f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#44a047',
          700: '#388e3c',
          800: '#2f7d32',
          900: '#1a5e20',
          accent : "#4caf50"
        },
        'theme-primary' : 'var(--primary-color)',
        'theme-secondary' : 'var(--secondary-color)',
        'theme-accent' : 'var(--accent-color)',
        'theme-background' : 'var(--background-color)',
        'theme-font-primary' : 'var(--font-color-primary)',
        'theme-font-secondary' : 'var(--font-color-secondary)',
        'alt-background' : 'var(--secondary-background-color)',
      },
    },
  },
  plugins: [],
}

