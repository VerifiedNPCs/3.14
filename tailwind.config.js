/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#4ade80",
        "primary-hover": "#22c55e",
        "background-light": "#f8fafc",
        "background-dark": "#0B0F17",
        "surface-dark": "#161b28",
        "surface-light": "#ffffff",
        "accent-purple": "#d946ef",
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(74, 222, 128, 0.4)',
        'neon-purple': '0 0 20px rgba(217, 70, 239, 0.4)',
      }
    },
  },
  plugins: [],
}
