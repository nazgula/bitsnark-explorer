import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Specify the port you want to use
  },
  css: {
    postcss: './postcss.config.cjs',
  },
  build: {
    outDir: '../backend/public', // Adjust this path based on your project structure
  },
})
