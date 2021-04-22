module.exports = api => {
  api.cache(true);

  return {
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '^react-native$': 'react-native-web',
          },
        },
      ],
    ],
    presets: [
      [
        '@babel/env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
          targets: {
            browsers: 'Last 2 Chrome versions, Firefox ESR',
            node: 'current',
          },
        },
      ],
      [
        '@babel/preset-react',
        {
          development: process.env.BABEL_ENV !== 'build',
        },
      ],
      '@babel/preset-typescript',
    ],
    env: {
      build: {
        ignore: [
          '**/*.test.tsx',
          '**/*.test.ts',
          '**/*.stories.tsx',
          '__snapshots__',
          '__tests__',
          '__stories__',
        ],
      },
    },
    ignore: ['node_modules'],
  };
};
