const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,tsx}',
    './public/**/*.{html,js,ts,tsx}',
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
        gold: '#FAE1A2',
        piano: {
          "edge": "#FCFCFC",
          "surface": "#F0F0F0"
        }
      },
      spacing: {
        192: '48rem',
        96: '24rem'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
