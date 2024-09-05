/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: { 
    extend: {
      colors: {
        primary: "#333",
        background: "#242424",
        accent: "#60b9fe",
        color: "#fff",
      }
    },
  },
  plugins: [],
}

