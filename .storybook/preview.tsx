import * as DocBlock from '@storybook/blocks';
import { Parameters, Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider, lightTheme } from '../packages/react-core';
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
};

export default preview;

const withThemeProvider = Story => (
  <ThemeProvider theme={lightTheme}>
    <Story />
  </ThemeProvider>
);

export const decorators = [withThemeProvider];
