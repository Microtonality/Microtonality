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
      minHeight: {
        '450': '450px',
        '250': '250px',
        '150': '150px'
      },
      maxHeight: {
        '450': '450px'
      }
    },
  },
  plugins: [],
}
