const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,tsx}',
    './App.tsx'
],
  theme: {
    extend: {
      fontFamily: {
        'agrandir-wide': ["Agrandir-Wide", ...defaultTheme.fontFamily.sans],
        agrandir: ["Agrandir-Reg", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        bgdark: '#212121',
        bglight: '#313131',
        gold: '#FAE1A2'
      },
      spacing: {
        13: '3.25rem',
        14: '3.50rem',
        15: '3.75rem',
        16: '4.00rem',
        450: '450px',
        1000: '1000px'
      }
    },
  },
  plugins: [],
}
