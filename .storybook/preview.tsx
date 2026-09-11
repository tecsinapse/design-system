import * as DocBlock from '@storybook/addon-docs/blocks';
import { Parameters, Preview } from '@storybook/react-vite';
import React from 'react';
import { lightTheme, ThemeProvider } from '../packages/react-core';
import './index.css';

const parameters: Parameters = {
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
        'react-core',
      ],
    },
  },
  backgrounds: {
    options: {
      white: {
        name: 'white',
        value: '#fff',
      },

      light: {
        name: 'light',
        value: '#f8f7f7',
      },

      medium: {
        name: 'medium',
        value: '#85807a',
      },

      dark: {
        name: 'dark',
        value: '#5d5955',
      },
    },
  },
  type: 'auto',
  docs: {
    argTypes: {
      sort: 'requiredFirst',
    },
    canvas: { sourceState: 'shown' },
    source: {
      type: 'code',
      language: 'tsx',
    },
    page: () => (
      <>
        <DocBlock.Title />
        <DocBlock.Description />
        <div
          style={{
            color: '#5C6870',
            fontSize: '13px',
            fontWeight: 'bold',
            lineHeight: '16px',
            marginBottom: '12px',
            marginTop: '32px',
          }}
        >
          Props
        </div>
        <DocBlock.ArgTypes />
        <div
          style={{
            color: '#5C6870',
            fontSize: '13px',
            fontWeight: 'bold',
            lineHeight: '16px',
            marginBottom: '12px',
            marginTop: '32px',
          }}
        >
          Default component
        </div>
        <DocBlock.Primary />

        <DocBlock.Stories includePrimary={false} />
      </>
    ),
  },
};

const preview: Preview = {
  tags: ['autodocs'],
  parameters,

  initialGlobals: {
    backgrounds: {
      value: 'light',
    },
  },
};

export default preview;

const withThemeProvider = Story => (
  <ThemeProvider theme={lightTheme}>
    <Story />
  </ThemeProvider>
);

export const decorators = [withThemeProvider];
