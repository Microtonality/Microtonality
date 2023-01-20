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
        30: '30px',
        33: '33px',
        36: '36px',
        40: '40px',
        48: '48px',
        55: '55px',
        65: '65px',
        80: '80px',
        100:'100px',
        125: '125px',
        150: '150px',
        225: '225px',
        250: '250px',
        275: '275px',
        300: '300px',
        315: '315px',
        337: '337px',
        350: '350px',
        360: '360px',
        400: '400px',
        450: '450px',
        500: '500px',
        700: '700px',
        750: '750px',
        800: '800px',
        1000: '1000px',
      },
      minHeight: {
        '450': '450px',
        '250': '250px',
        '150': '150px'
      },
      maxHeight: {
        '450': '450px'
      },
      screens: {
        'xs': '0px',
      },
    },
  },
  plugins: [],
}
