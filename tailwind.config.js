/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xss: '360px',
        xs: '414px'
      },
      colors: {
        primary: "#00BFA5",
        secondary: "#E61236",
        defaultText: "#37474F",
        gray: "#B6B6B6",
        graySecondary: "#D4D4D4",
        grayLayout: "#f0f0f0",
      },
      fontFamily: {
        "vazir-bold": ['"Vazir-Bold", sans-serif'],
        "vazir-light": ['"Vazir-Light", sans-serif'],
        "vazir-medium": ['"Vazir-Medium", sans-serif'],
        "vazir-thin": ['"Vazir-Thin", sans-serif'],
        vazir: ['"Vazir", sans-serif'],
      },
      fontSize:{
        "2xs" : "0.6rem"
      }
    }
  },
  plugins: [],
};
