/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "base-bg": "#ededed",
        "tag-bg": "#a6a6a6",
        "bgray": "#aaaaaa",
      },
    },
  },
  plugins: [],
}

