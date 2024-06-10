import React from 'react';
import { StoryFn } from '@storybook/react';
import { Button } from '../index';

export default {
  title: 'Cortex-React/Button',
  component: <div />,
  argTypes: {
    intent: {
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      control: { type: 'select' },
    },
    variant: {
      options: ['outline', 'text', 'filled'],
      control: { type: 'select' },
    },
    size: {
      options: ['small', 'default', 'circle', 'square'],
      control: { type: 'select' },
    },
  },
};

const Template: StoryFn = args => {
  return (
    <Button
      variants={{ intent: args.intent, variant: args.variant, size: args.size }}
    >
      <p>Button</p>
    </Button>
  );
};

export const Base = {
  render: Template,
  args: {},
};
