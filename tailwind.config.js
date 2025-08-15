/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blank: "#ECEBE9",
        obscure: "#1F1F1F",
        orange: "#F77402",
        orangeBlank: "#FFEFE1",
        aquamarine: "#009395",
        aquamarineBlank: "#D5F8F8",
        yellow: "#eee206",
        green: "#51A434",
        red: "#EC3434",
        gray: "#7E7979",
        grayBlank: "#D8D8D8",
      },
      fontFamily: {
        WindSong: ['WindSong'],
        Grandstander: ['Grandstander']
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}

