import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: { alias: { 'react-native': 'react-native-web' } },
}));
