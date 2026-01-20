const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { generate } = require('@storybook/react-native/scripts/generate');

generate({
  configPath: path.resolve(__dirname, './.storybook'),
});

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];
config.resolver.unstable_enableSymlinks = true;
config.resolver.disableHierarchicalLookup = true;

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

const reactPath = path.resolve(projectRoot, 'node_modules/react');
const rnPath = path.resolve(projectRoot, 'node_modules/react-native');

config.resolver.extraNodeModules = {
  react: reactPath,
  'react/jsx-runtime': path.join(reactPath, 'jsx-runtime'),
  'react/jsx-dev-runtime': path.join(reactPath, 'jsx-dev-runtime'),
  'react-native': rnPath,

  '@tecsinapse/react-core': path.resolve(workspaceRoot, 'packages/react-core'),
  '@tecsinapse/react-native-kit': path.resolve(
    workspaceRoot,
    'packages/react-native-kit'
  ),
  '@tecsinapse/react-charts': path.resolve(
    workspaceRoot,
    'packages/react-charts'
  ),
  '@tecsinapse/react-web-kit': path.resolve(
    workspaceRoot,
    'packages/react-web-kit'
  ),
  '@tecsinapse/cortex-core': path.resolve(
    workspaceRoot,
    'packages/cortex-core'
  ),
  '@tecsinapse/cortex-react': path.resolve(
    workspaceRoot,
    'packages/cortex-react'
  ),
};

config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  'story.tsx',
  'story.ts',
  'story.jsx',
  'story.js',
  'stories.tsx',
  'stories.ts',
  'stories.jsx',
  'stories.js',
];

module.exports = config;
