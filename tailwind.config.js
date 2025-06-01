/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector', // Make sure this is 'class' not 'media'
  content: ['./index.html', './*.{js,html}'],
  theme: {
    extend: {}
  },
  plugins: []
}