/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,tsx}',
    './App.tsx'
],
  theme: {
    extend: {
      fontFamily: {
        agrandirwide: ["Agrandir-Wide"],
        agrandir: ["Agrandir-Reg"]
      },
      colors: {
        bgdark: '#212121',
        bglight: '#313131',
        gold: '#FAE1A2'
      },
    },
  },
  plugins: [],
}
