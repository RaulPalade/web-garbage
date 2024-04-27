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
          lighter: "#B3D4FF",
          light: "#66A3FF",
          primary: "#0047B3",
          dark: "#002E80",
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
