/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      extend: {
          colors: {
              primary: {
                  light: "#00A7CC",
                  DEFAULT: "#00A8CC",
                  dark: "#002D31",
                  darker: "#002529",
              },
              secondary: {
                  light: "",
                  DEFAULT: "#FFA500",
                  dark: "",
              },
              white: {
                  light: "#F7f7f7",
                  DEFAULT: "#ffffff",
                  dark: "#F6F7F9",
              },
              dark: {
                  light: "#677d8f",
                  DEFAULT: "#001214",
              },
          },
          fontFamily: {
              sans: ["Poppins", "sans-serif"],
              serif: ["Poppins", "serif"],
          },
          screens: {
              "3xl": "1600px",
              "4xl": "1920px",
          },
      },
  },
  plugins: [],
};
