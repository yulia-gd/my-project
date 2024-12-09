import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // Якщо потрібно виключити ці залежності
  },
  base: '/my-project/', // Вкажіть коректний шлях для розгортання
});