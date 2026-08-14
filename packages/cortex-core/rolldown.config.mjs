import copy from 'rollup-plugin-copy';

export default {
  input: './src/index.ts',
  output: {
    dir: 'dist/esm',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: false,
  },
  plugins: [
    copy({
      targets: [{ src: 'src/default.css', dest: 'dist' }],
    }),
  ],
  external: ['tailwind-variants', 'clsx', 'tailwind-merge'],
};
