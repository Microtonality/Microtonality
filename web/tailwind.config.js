const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

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
        rederror: '#C91A1A',
        piano: {
          "edge": "#FCFCFC",
          "surface": "#F0F0F0"
        }
      },
      spacing: {
        192: '48rem',
        96: '24rem'
      },
      keyframes: {
        scaleIn: {
          '0%': {transform: 'scale(0)'},
          '100%': {transform: 'scale(1)'},
        },
      },
      animation: {
        'scale-in': 'scaleIn .15s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus']);
      addVariant('group-hocus', [':merge(.group):hover &', ':merge(.group):focus &'])
    })
  ],
}
