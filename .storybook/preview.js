import { lightTheme, ThemeProvider } from '@tecsinapse/react-core/src';

export const parameters = {
  layout: 'centered',
  options: {
    storySort: {
      order: [
        'Introduction',
        ['Welcome', 'Get started', 'Using on web', 'Styling', 'Contributing'],
        'Hybrid',
        'Web',
      ],
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'white',
        value: '#fff',
      },
      {
        name: 'light',
        value: '#f8f7f7',
      },
      {
        name: 'medium',
        value: '#85807a',
      },
      {
        name: 'dark',
        value: '#5d5955',
      },
    ],
  },
};

const withThemeProvider = Story => (
  <ThemeProvider theme={lightTheme}>
    <Story />
  </ThemeProvider>
);

export const decorators = [withThemeProvider];
