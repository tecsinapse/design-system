import esbuild from "rollup-plugin-esbuild";
import copy from "rollup-plugin-copy";


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
    plugins: [
      esbuild({ tsconfig: 'tsconfig.build.json', target: 'esnext' }),
      copy({
        targets: [
          { src: 'src/default.css', dest: 'dist' }
        ]
      })

    ],
    external: [
      'tailwind-variants',
      'clsx',
      'tailwind-merge',
    ],
  },
];
