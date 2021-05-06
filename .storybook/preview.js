import { lightTheme, ThemeProvider } from '@tecsinapse/react-core/src';

const SORT_ORDER = {
  Introduction: ['Get started'],
};

export const parameters = {
  docs: {
    lightTheme,
  },
  options: {
    storySort: SORT_ORDER,
  },
};

const withThemeProvider = Story => (
  <ThemeProvider theme={lightTheme}>
    <Story />
  </ThemeProvider>
);

export const decorators = [withThemeProvider];
