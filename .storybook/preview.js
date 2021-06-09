import { lightTheme, ThemeProvider } from '@tecsinapse/react-core/src';
import { sortStories } from './utils/helpers';

const SORT_ORDER = {
  Introduction: ['Welcome', 'Get started', 'Using on web', 'Contributing'],
  Components: [],
};

export const parameters = {
  layout: 'centered',
  options: {
    storySort: sortStories(SORT_ORDER),
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
