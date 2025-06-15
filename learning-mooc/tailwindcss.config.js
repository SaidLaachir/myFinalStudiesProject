/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // important for dark mode to work via class toggling
  theme: {
    extend: {},
  },
  plugins: [],
}
