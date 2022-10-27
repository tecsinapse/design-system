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
        dir: 'dist/esm',
        format: 'esm',
        ...outputDefaultConfig,
      },
      {
        dir: 'dist/cjs',
        format: 'cjs',
        exports: 'auto',
        ...outputDefaultConfig,
      },
    ],
    plugins: [esbuild({ tsconfig: 'tsconfig.build.json', target: 'esnext' })],
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
