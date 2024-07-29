import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Button } from '../src';

export default {
  title: 'Cortex/Button',
  component: Button,
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

// const Template: StoryFn = args => {
//   return (
//     <Button
//       variants={{ intent: args.intent, variant: args.variant, size: args.size }}
//     >
//       Label
//     </Button>
//   );
// };

// export const Base = {
//   render: Template,
//   args: {},
// };
