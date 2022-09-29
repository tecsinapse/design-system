import esbuild from 'rollup-plugin-esbuild';

const outputDefaultConfig = {
  preserveModules: true,
  preserveModulesRoot: 'src',
  sourcemap: true,
};

export default [
  {
    input: ['./src/index.ts'],
    output: [
      {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].mjs',
        ...outputDefaultConfig,
      },
      {
        dir: 'dist',
        format: 'cjs',
        exports: 'auto',
        entryFileNames: '[name].cjs',
        ...outputDefaultConfig,
      },
    ],
    plugins: [esbuild({ tsconfig: 'tsconfig.build.json' })],
    external: [
      'react',
      'react-native',
      'react-native-vector-icons',
      '@emotion/native',
      '@emotion/react',
      'currency.js',
      'date-fns',
    ],
  },
];
