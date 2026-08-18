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
      targets: [
        { src: 'src/default.css', dest: 'dist' },
        { src: 'src/tokens.css', dest: 'dist' },
        { src: 'src/tokens-native.css', dest: 'dist' },
      ],
    }),
  ],
  external: ['tailwind-variants', 'clsx', 'tailwind-merge', 'date-fns'],
};
