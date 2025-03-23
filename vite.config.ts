import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ensure consistent dev server port
    open: true, // Auto open browser on start
  },
  build: {
    outDir: "dist",
    sourcemap: true, // Enable source maps for debugging
  },
});
