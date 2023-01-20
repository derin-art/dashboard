/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--inter-font)", "serif"],
        Unbounded: ["Unbounded", "sans"],
      },
      colors: {
        ultraGray: "#242424",
        ultraBlack: "#1a1a1a",
        spaceCadet: "#2E294E",
        kobi: "#D499B9",
        keppelG: "#2EBFA5",
        bsRed: "#ED6A5E",
        AquaMarine: "#4CE0B3",
        seaShell: "#FFEFEB",
      },
    },
  },
  plugins: [],
};
