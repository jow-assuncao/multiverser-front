/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    fontFamily: {
      "Oxanium": ["Oxanium"]
    },
    extend: {
      colors: {
        black: "#141516",
        white: "#EBF0F4",
  
        gray: "#797E82",
        grayLight: "#B9BEC2",
        grayDark: "#35393D",
  
        primary: "#104F86",
        secondary: "#F0764F"
      },
    },
  },
  plugins: [],
}
