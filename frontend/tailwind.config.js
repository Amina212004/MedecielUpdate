/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
   extend: {
      screens: {
        '2xl': '1400px',
        'lg-max-900': {'max': '900px'},
        'md-max-700': {'max': '700px'},
      },
    },
  },
  plugins: [],
}

