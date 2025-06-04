// client/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(), // ← This tells Vite how to transform .tsx/.jsx
  ],
  server: {
    port: 5173,
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' } // optional, only if you want "@/" imports
    ]
  }
});
