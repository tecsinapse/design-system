export default {
  framework: {
    name: '@storybook/react-vite',
  },
  stories: [
    '../packages/react-core/**/*.stories.@(tsx|jsx)',
    '../packages/react-web-kit/**/*.stories.@(tsx|jsx)',
    '../packages/cortex-react/**/*.stories.@(tsx|jsx)',
    '../docs/**/*.mdx',
  ],
  addons: [
    { name: '@storybook/addon-docs', options: { configureJSX: true } },
    '@storybook/addon-controls',
    '@storybook/addon-backgrounds',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@storybook/addon-essentials',
  ],
  staticDirs: ['public/'],
};
