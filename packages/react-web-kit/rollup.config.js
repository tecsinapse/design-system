import esbuild from 'rollup-plugin-esbuild';
import alias from '@rollup/plugin-alias';

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
        dir: 'esm',
        format: 'esm',
        ...outputDefaultConfig,
      },
      {
        dir: 'dist',
        format: 'cjs',
        exports: 'auto',
        ...outputDefaultConfig,
      },
    ],
    plugins: [
      alias({
        entries: [{ find: 'react-native', replacement: 'react-native-web' }],
      }),
      esbuild({ tsconfig: 'tsconfig.build.json' }),
    ],
    external: [
      'react',
      'react-dom',
      'react-native-web',
      '@emotion/native',
      '@emotion/react',
      '@emotion/styled',
      '@tecsinapse/react-core',
      'react-native-vector-icons',
      'react-transition-group',
    ],
  },
];
