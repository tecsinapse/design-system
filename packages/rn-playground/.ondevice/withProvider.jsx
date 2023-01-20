import {
  lightTheme,
  ModalGroupManager,
  ThemeProvider,
} from '@tecsinapse/react-native-kit';
import React from 'react';

export const withThemeProvider = Story => (
  <ThemeProvider theme={lightTheme}>
    <ModalGroupManager />
    <Story />
  </ThemeProvider>
);
