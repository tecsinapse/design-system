export default {
  framework: {
    name: '@storybook/react-vite',
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  stories: [
    '../packages/react-core/**/*.stories.@(tsx|jsx)',
    '../packages/react-web-kit/**/*.stories.@(tsx|jsx)',
    '../packages/cortex-core/**/*.stories.@(tsx|jsx)',
    '../packages/cortex-react/**/*.stories.@(tsx|jsx)',
    '../docs/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-backgrounds',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
  ],
  staticDirs: ['public/'],
  docs: {
    autodocs: true,
  },
};
