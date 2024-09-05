import esbuild from 'rollup-plugin-esbuild';

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
      'react-icons/lia',
      'react-icons/md',
      'react-icons/io5',
      'react-icons/io',
      'react-icons/fa',
      'clsx',
      'currency.js',
      'react-stately',
      'react-aria',
      'sonner',
      '@floating-ui/react',
      'react-spring-carousel',
      'tailwind-variants',
      '@internationalized/date',
    ],
  },
];
