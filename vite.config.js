import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), // React plugin
    tailwindcss(), // Tailwind CSS plugin
  ],
  base: './', // Ensures assets use relative paths during production builds (necessary for subdirectory deployments)
  css: {
    modules: {
      scopeBehaviour: 'local', // Scopes styles to prevent global leakage
      generateScopedName: '[name]__[local]___[hash:base64:5]', // Human-readable CSS class names for debugging
      hashPrefix: 'vite', // Optional: Prefix CSS hash for uniqueness
    },
  },
  server: {
    port: 3000, // Default port for local development
    open: true, // Automatically opens the app in the browser
    host: '0.0.0.0', // Allows the app to be accessible from other devices on the same network
  },
  build: {
    outDir: 'dist', // Directory for the production build
    sourcemap: false, // Disable sourcemaps in production for smaller build size
    rollupOptions: {
      output: {
        // Ensure proper chunks and optimization
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
});
