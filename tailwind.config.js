const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-Manrope)"],
        mono: ["var(--font-Poppins)"],
      },
      animation: {
        shine: "shine 3s",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const utilities = {
        ".bg-csd-dark-green": {
          background:
            "linear-gradient(172.01deg, #0A5054 6.15%, #001C1C 88.92%);",
        },
        ".shadow-csd-tab": {
          "box-shadow": "0px 4px 4px rgba(0, 0, 0, 0.25);",
        },
        ".bg-footer": {
          "padding-right": "0px",
          "background-image": `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)),url("https://www.pngmart.com/files/7/Abstract-World-Map-Transparent-Background.png")`,
          "background-size": "contain",
          "background-position-x": "50%",
          "background-position-y": "center",
        },
      };

      addUtilities(utilities);
    }),
  ],
};
