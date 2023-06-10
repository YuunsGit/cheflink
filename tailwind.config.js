/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "dots-pattern":
          "radial-gradient(circle, #ffa39a 10%, transparent 11%),radial-gradient(circle at bottom left, #ffa39a 5%, transparent 6%),radial-gradient(circle at bottom right, #ffa39a 5%, transparent 6%),radial-gradient(circle at top left, #ffa39a 5%, transparent 6%),radial-gradient(circle at top right, #ffa39a 5%, transparent 6%)",
      },
      backgroundSize: {
        "dots-size": "2em 2em",
      },
      colors: {
        primary: {
          50: "#fff1f0",
          100: "#ffe1de",
          200: "#ffc8c3",
          300: "#ffa39a",
          400: "#ff6d5f",
          500: "#ff402e",
          600: "#f4220e",
          700: "#c21707",
          800: "#aa180a",
          900: "#8c1b10",
          950: "#4d0802",
        },
        secondary: {
          50: "#fff9ed",
          100: "#fff2d5",
          200: "#fde1ab",
          300: "#fcca75",
          400: "#faa83d",
          500: "#f89526",
          600: "#e9720d",
          700: "#c1560d",
          800: "#994413",
          900: "#7b3913",
          950: "#431b07",
        },
        ternary: "#f99766",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
