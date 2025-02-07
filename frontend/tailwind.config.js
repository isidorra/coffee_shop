/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "outfit" : ["Outfit", "serif"]
      }, 
      colors: {
        "primary" : "#D6DBDF",
        "secondary" : "#1F1F1F",
        "accent" : "#FDE797",
        "dark-gray" : "#434343"
      }
    },
  },
  plugins: [],
}