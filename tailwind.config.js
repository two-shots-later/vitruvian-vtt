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
      animation: {
				fade: 'fadeIn .15s ease-in-out',
			},
			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				fadeOut: {
				  from: { opacity: 1 },
					to: { opacity: 0 },
				}
			},
			backgroundImage: {
			 'graph-paper': "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAABpBAMAAADLrBAJAAAAElBMVEW9vb2SkpK9vb29vb2+vr69vb3CFyyWAAAABnRSTlM+B2AzHE0R53HmAAAAdklEQVR4AWNgECQDMjAZK4GgiRKEdobQqsYQOgirrAKDMEFlmLIG5Okiz4U4dY36a9RfIqEuJEOHkRZfo/4a9Rd5OWXExdeov0b9xepCelYJGGnxNeqvUX+Rl1PI89dofI36a7SfMhpfo/4a7aeM9lNG/TXqLwCwpddSj5lJkwAAAABJRU5ErkJggg==)"
			},
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
        'theme-background-secondary' : 'var(--background-alt-color)',
        'theme-font-primary' : 'var(--font-color-primary)',
        'theme-font-secondary' : 'var(--font-color-secondary)',
        'theme-button-background' : 'var(--button-background)',
        'theme-error' : 'var(--error-color)',
      },
    },
  },
  plugins: [],
}

