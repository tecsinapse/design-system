module.exports = {
  stories: [
    '../packages/**/*.stories.@(tsx|jsx)',
    '../docs/*/*.stories.@(js|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@storybook/addon-docs/',
  ],
};
