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
      '@tecsinapse/cortex-core',
      'react-icons',
      'clsx'
    ],
  },
];
