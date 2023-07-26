const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const defaultConfig = getDefaultConfig(projectRoot);

defaultConfig.resolver.resolverMainFields = [
  'sbmodern',
  ...defaultConfig.resolver.resolverMainFields,
];

defaultConfig.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  },
});

const monorepoPackages = {
  '@tecsinapse/react-core': path.resolve(workspaceRoot, 'packages/react-core'),
  '@tecsinapse/react-native-kit': path.resolve(
    workspaceRoot,
    'packages/react-native-kit'
  ),
};

defaultConfig.watchFolders = [
  ...defaultConfig.watchFolders,
  './.storybook',
  projectRoot,
  ...Object.values(monorepoPackages),
];

defaultConfig.resolver.extraNodeModules = monorepoPackages;

defaultConfig.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];
defaultConfig.resolver.disableHierarchicalLookup = true;

module.exports = defaultConfig;
