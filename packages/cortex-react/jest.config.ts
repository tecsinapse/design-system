import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  displayName: 'cortex-react',
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '../../',
  setupFilesAfterEnv: ['<rootDir>jest.setup.ts'],
  moduleNameMapper: {
    '@tecsinapse/cortex-core(.*)$': '<rootDir>/packages/cortex-core/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
