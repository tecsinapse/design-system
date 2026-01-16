import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  resolve: { alias: { 'react-native': 'react-native-web' } },
});
