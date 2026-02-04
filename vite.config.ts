
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Replace with your repository name if not using a custom domain
  base: '/', 
  build: {
    outDir: 'dist',
  },
});
