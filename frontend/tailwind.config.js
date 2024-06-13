module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS and TS files in src directory
    "./public/**/*.html", // Include all HTML files in the public directory
    "./components/**/*.{js,jsx,ts,tsx}", // If you have a components directory
    "./pages/**/*.{js,jsx,ts,tsx}", // If you have a pages directory (common in Next.js)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
