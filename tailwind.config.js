/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/presentation/**/*.{js,ts,jsx,tsx}"],

  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: (theme) => ({
        112: "28rem",
        120: "30rem",
      }),
      minHeight: (theme) => ({
        80: "20rem",
      }),
      colors: {
        palette: {
          lighter: "#EADDFF",
          light: "#D0BCFF",
          primary: "#4F378B",
          dark: "#21005D",
        },
      },
      fontFamily: {
        primary: ['"Josefin Sans"'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
