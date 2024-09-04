/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        'gradient-custom-blue': 'linear-gradient(to bottom, #0551F6, #0D3A9D)', // Define your custom gradient
        'gradient-custom-no' : 'linear-gradient(to bottom, #0551F6,#00754245)'
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',     /* Firefox */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none',  /* Safari and Chrome */
        },
      }, ['responsive', 'hover']);
    },
  ],
}
