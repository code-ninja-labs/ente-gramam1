import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginCopy from 'vite-plugin-copy';

export default defineConfig({
  plugins: [
    react(),
    vitePluginCopy({
      targets: [
        { src: 'src/assets', dest: 'dist/assets' } // Example copy configuration
      ],
    }),
  ],
});
