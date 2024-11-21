/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "roboto": ["Roboto", "sans-serif"],
        "poppins": ["Poppins", "sans-serif"],
        "garamond": ["EB Garamond", "serif"]
      },
      screens: {
        'max600': { 'max': '600px' },
      }
    },
  },
  plugins: [],
}