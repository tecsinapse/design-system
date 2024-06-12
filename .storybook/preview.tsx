import React from 'react';
import { lightTheme, ThemeProvider } from '../packages/react-core';
import './index.css';

export const parameters = {
  layout: 'centered',
  options: {
    storySort: {
      order: [
        'Introduction',
        ['Welcome', 'Installation', 'Usage'],
        'Setup (non cortex)',
        'tokens',
        'development',
        'Cortex',
        'react-web-kit',
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
