import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [resolve(__dirname, '../../vitest.setup.ts')],
    maxWorkers: 4,
  },
  resolve: {
    alias: {
      '@tecsinapse/cortex-core': resolve(__dirname, '../cortex-core/src'),
    },
  },
});
