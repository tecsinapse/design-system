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
        entryFileNames: '[name].js',
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
      'react-native-linear-gradient',
      '@emotion/native',
      '@emotion/react',
      '@tecsinapse/react-core',
      'react-native-vector-icons',
      'react-native-safe-area-context',
      'uuid',
      'date-fns/locale',
    ],
  },
];
