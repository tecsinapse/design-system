import React from 'react';
import { StoryFn } from '@storybook/react';
import { Button } from '../src';

export default {
  title: 'Cortex/Button',
  component: Button,
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
      Label
    </Button>
  );
};

export const Base = {
  render: Template,
  args: {},
};
