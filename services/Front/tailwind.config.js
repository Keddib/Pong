module.exports = {
  mode: "jit",
  content: ['./src/**/*.{html,js}'],
  theme: {
    colors: {
      // Configure your color palette here
      transparent: 'transparent',
      current: 'currentColor',
      lotion: 'rgb(var(--color-lotion) / <alpha-value>)',
      spaceCadet: 'rgb(var(--color-spaceCadet) / <alpha-value>)',
      pictonBlue: 'rgb(var(--color-pictonBlue) / <alpha-value>)',
      cornFlower: 'rgb(var(--color-cornFlowerBlue) / <alpha-value>)',
      queenBlue: 'rgb(var(--color-queenBlue) / <alpha-value>)',
      crayola: 'rgb(var(--color-crayola) / <alpha-value>)',
      electricGreen: 'rgb(var(--color-electricGreen) / <alpha-value>)',
      yonder: 'rgb(var(--color-yonder) / <alpha-value>)',
      red: 'rgb(var(--color-red) / <alpha-value>)',
    },
    fontFamily: {
      'beaufort': ["Beaufort", "Georgia", "serif"],
      'spiegel': ["Spiegel", "Arial", "sans-serif"],
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 800,
    },
    container: {
      center: true,
    },
    screens: {
      'sm': '500px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    }
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")]
}
