/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        primary: '#00F5FF',
        accent: '#8A2BE2',
        glow: '#00FFFF',
        textMain: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
