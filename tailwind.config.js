/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // screens: {
    //   'tablet': '640px',
    //   // => @media (min-width: 640px) { ... }

    //   'laptop': '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   'desktop': '1280px',
    //   // => @media (min-width: 1280px) { ... }
    // },
    // colors: {
    //   'primary': '#610094',
    //   'secoundry': '#3F0071',
    //   'primaryDark': '#150050',
    //   'secoundryWhite': '#000000',
    // },
    extend: {
      fontFamily: {
        display: 'Bebas Neue, ui-serif', // Adds a new `font-display` class
      }
    },
  },
  plugins: [],
}

