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
          light: '#F7931A', // Light variant of the primary color
          DEFAULT: '#F7931A', // Default variant of the primary color
          dark: '#F7931A', // Dark variant of the primary color
        },
        secondary: {
          light: '#DEA01E', // Light variant of the secondary color
          DEFAULT: '#DEA01E', // Default variant of the secondary color
          dark: '#D83A56', // Dark variant of the secondary color
        },
        black: '#14151f', // Custom black color
      },
    },
  },
  plugins: [],
}

