export default {
  stories: ['../stories/**/*.stories.?(ts|tsx|js|jsx)'],
  addons: [],
  deviceAddons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-backgrounds',
    '@storybook/addon-ondevice-actions',
  ],
  typescript: {
    reactDocgen: 'none',
  },
};
