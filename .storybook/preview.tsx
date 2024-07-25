import * as DocBlock from '@storybook/blocks';
import { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider, lightTheme } from '../packages/react-core';
import './index.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    type: 'auto',
    docs: {
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
              backgroundColor: '#e2e6e9',
              padding: 16,
              borderRadius: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <DocBlock.Story />
          </div>
          <div
            style={{
              color: '#5C6870',
              fontSize: '13px',
              fontWeight: 'bold',
              lineHeight: '16px',
              letterSpacing: '0.35em',
              marginBottom: '12px',
              marginTop: '32px',
            }}
          >
            PROPS
          </div>
          <DocBlock.ArgTypes />
          <DocBlock.Stories />
        </>
      ),
    },
  },
};

export default preview;

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
