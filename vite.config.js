import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import copy from 'vite-plugin-copy';

export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        { src: 'public/*', dest: 'cordova-app/www' },
      ]
    })
  ],
  build: {
    outDir: 'cordova-app/www',      // <-- Output directory
    emptyOutDir: true
  },
  base: './', // Ensures relative asset paths in the production build
});
