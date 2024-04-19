/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00255F', // Set primary color
        secondary: '#f3f3f3', // Set secondary color
        
      },
    },
  },
  plugins: [],
}
