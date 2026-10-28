import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { contactApi } from './backend-integration/vite-plugin.mjs';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), contactApi()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
