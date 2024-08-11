/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Adjust this path based on your file structure
    './public/index.html',        // Include other relevant paths if needed
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3FA2F6', // Light variant of the primary color
          DEFAULT: '#3FA2F6', // Default variant of the primary color
          dark: '#282642', // Dark variant of the primary color
        },
        secondary: {
          light: '#DEA01E', // Light variant of the secondary color
          DEFAULT: '#DEA01E', // Default variant of the secondary color
          dark: '#D83A56', // Dark variant of the secondary color
        },
      },
    },
  },
  plugins: [],
}

