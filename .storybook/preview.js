import { lightTheme, ThemeProvider } from '@tecsinapse/react-core/src';

const withThemeProvider = Story => (
  <ThemeProvider theme={lightTheme}>
    <Story />
  </ThemeProvider>
);

export const decorators = [withThemeProvider];
