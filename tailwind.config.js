/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Metropolis", "ui-sans-serif", "system-ui"],
      serif: ["Garamond Premiere Pro", "ui-serif"],
      rubik: ["Rubik"],
      inter: ["Inter"],
    },
    extend: {
      colors: {
        "gmco-blue": {
          DEFAULT: "#8EBFD0",
          main: "#287D92",
          secondary: "#B8DEE9",
        },
        "gmco-yellow": {
          DEFAULT: "#F5DB91",
          secondary: "#C0925E",
        },
        "gmco-grey": {
          DEFAULT: "#2d2d2f",
          secondary: "#786b63",
        },
        "gmco-white": {
          DEFAULT: "#f6f7f1",
        },
        "gmco-orange": {
          secondarydark: "#7c311e",
          secondarylight: "#c76734",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  important: true,
};
