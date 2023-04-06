/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend:{
        colors:{
          'gmco-blue':{
            DEFAULT: '#8EBFD0',
            main:'#287D92',
            secondary:'B8DEE9'
          },
          'gmco-yellow':{
            DEFAULT:'#F5DB91',
            secondary:'#C0925E'
          },
          'gmco-grey':{
            DEFAULT:'#2d2d2f',
            secondary:'786b63'
          },
          'gmco-white':{
            DEFAULT:'#f6f7f1'
          },
          'gmco-orange':{
            secondarydark:'#7c311e',
            secondarylight:'#c76734'
          }
        }
      }
    },
  plugins: [],
};
