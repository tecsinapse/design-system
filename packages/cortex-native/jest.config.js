module.exports = {
  preset: 'react-native',
  testMatch: ['<rootDir>/src/**/*.test.ts{,x}'],
  moduleNameMapper: {
    '^@tecsinapse/cortex-core$':
      '<rootDir>/../cortex-core/src/index.ts',
  },
};
