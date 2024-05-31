/** @type {import('tailwindcss').Config} */
// tailwind ui
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    // daisy ui
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      // white
      "light",
      "cupcake",
      "corporate",
      // black
      "dark",
      "synthwave",
      "black",
      "luxury",
      "dracula",
      "night",
      "dim",
    ],
  },
}