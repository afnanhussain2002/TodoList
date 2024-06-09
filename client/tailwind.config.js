/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'first-color':'#E3E9FF',
        'second-color': '#AF7EEB'
      }
    },
  },
  plugins: [require('daisyui'),],
}

