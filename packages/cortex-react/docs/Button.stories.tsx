import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Button } from '../src';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { ThemeProvider, useDarkTheme } from '@tecsinapse/cortex-core';

export default {
  title: 'Cortex/Button',
  component: Button,
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta<typeof Button>;

export const Default: StoryObj<typeof Button> = {
  args: {
    variants: {
      variant: 'filled',
      size: 'default',
    },
  },
  render: args => <Button variants={args.variants}>Filled Button</Button>,
};

export const Outline: StoryObj<typeof Button> = {
  args: {
    variants: {
      variant: 'outline',
      size: 'default',
    },
  },
  render: args => <Button variants={args.variants}>Outline Button</Button>,
};

export const Text: StoryObj<typeof Button> = {
  args: {
    variants: {
      variant: 'text',
      size: 'default',
    },
  },
  render: args => <Button variants={args.variants}>Text Button</Button>,
};

export const Circle: StoryObj<typeof Button> = {
  args: {
    variants: {
      variant: 'filled',
      size: 'circle',
    },
  },
  render: args => (
    <Button variants={args.variants}>
      <FaUser />
    </Button>
  ),
};

export const Square: StoryObj<typeof Button> = {
  args: {
    variants: {
      variant: 'filled',
      size: 'square',
    },
  },
  render: args => (
    <Button variants={args.variants}>
      <FaUser />
    </Button>
  ),
};

export const DarkMode: StoryObj<typeof Button> = {
  args: {
    variants: {
      variant: 'filled',
      size: 'default',
    },
  },
  render: args => {
    const { toggleTheme, theme } = useDarkTheme();
    return (
      <div className="w-[300px] h-[300px] bg-miscellaneous-body flex items-center justify-center">
        <Button variants={args.variants} onClick={toggleTheme}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </Button>
      </div>
    );
  },
};
