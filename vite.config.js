import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/recognition/',
  plugins: [react()],
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/process': 'https://realmonte.pythonanywhere.com/process',
    },
  },
});
