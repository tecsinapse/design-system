import esbuild from "rollup-plugin-esbuild";

const outputDefaultConfig = {
  preserveModules: true,
  preserveModulesRoot: 'src',
  sourcemap: false,
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
