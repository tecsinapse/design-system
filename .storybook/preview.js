import { lightTheme, ThemeProvider } from '@tecsinapse/react-core/src';
import { sortStories } from './utils/helpers';

const SORT_ORDER = {
  Introduction: ['Welcome', 'Get Started', 'Contributing'],
  Components: [],
};

export const parameters = {
  docs: {
    lightTheme,
  },
  options: {
    storySort: sortStories(SORT_ORDER),
  },
};

const withThemeProvider = Story => (
  <ThemeProvider theme={lightTheme}>
    <Story />
  </ThemeProvider>
);

export const decorators = [withThemeProvider];
