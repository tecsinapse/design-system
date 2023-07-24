module.exports = {
  framework: {
    name: '@storybook/react-vite',
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  stories: [
    '../packages/react-core/**/*.stories.@(tsx|jsx)',
    '../packages/react-native-kit/**/*.stories.@(tsx|jsx)',
    '../packages/react-web-kit/**/*.stories.@(tsx|jsx)',
    '../packages/react-lab/**/*.stories.@(tsx|jsx)',
    '../docs/**/*.@(js|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-backgrounds',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
  ],
  staticDirs: ['public/'],
};
