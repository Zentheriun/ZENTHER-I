// One-Zenther/vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: './', // Your project root where index.html is
  publicDir: 'public', // Directory for static assets
  build: {
    outDir: 'dist', // Output directory for build
    rollupOptions: {
      input: {
        main: './index.html' // Entry point for your application
      }
    }
  },
  server: {
    open: true, // Automatically open the browser
  }
});