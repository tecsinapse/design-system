module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../packages/react-core/**/*.stories.@(tsx|jsx)',
    '../packages/react-native-kit/**/*.stories.@(tsx|jsx)',
    '../packages/react-web-kit/**/*.stories.@(tsx|jsx)',
    '../docs/**/*.stories.@(js|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-backgrounds',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
  ],
};
