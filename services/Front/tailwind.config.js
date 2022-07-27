module.exports = { // eslint
  mode: "jit",
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/*.html"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      // primary
      lotion: "#fdfdf9",
      spaceCadet: "#132952",
      pictonBlue: "#2dbff0",
      cornFlower: "#26477d",
      queenBlue: "#47649e",
      // secondary
      crayola: "#ffb027",
      electricGreen: "#00ff1a",
      yonder: "#a1b0cb",
      red: "#ff0000",
    },
    fontFamily: {
      beaufort: ["Beaufort", "Georgia", "serif"],
      spiegel: ["Spiegel", "Arial", "sans-serif"],
      poppins: ["Poppins", "sans-serif"]
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 800,
    },
    screens: {
      sm: "500px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/forms"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen xl": {
            maxWidth: "1536px",
          },
        },
      });
    },
  ],
};
