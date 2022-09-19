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
        dir: 'rollup/esm',
        format: 'esm',
        ...outputDefaultConfig,
      },
      {
        dir: 'rollup/cjs',
        format: 'cjs',
        exports: 'auto',
        ...outputDefaultConfig,
      },
    ],
    plugins: [esbuild()],
    external: ['react', 'react-dom', 'react-native', 'react-vector-icons'],
  },
];
