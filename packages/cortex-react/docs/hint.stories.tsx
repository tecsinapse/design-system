import React from 'react';
import { StoryFn } from '@storybook/react';
import { Hint } from '../src';

export default {
  title: 'Cortex/Hint',
  component: Hint,
  args: {
    intent: 'default',
    description: 'Hint description',
  },
  argTypes: {
    intent: {
      options: ['default', 'success', 'warning', 'error'],
      control: { type: 'select' },
    },
    description: {
      control: { type: 'text' },
    },
  },
};

const Template: StoryFn = args => {
  return (
    <Hint variants={{ intent: args.intent }} description={args.description} />
  );
};

export const Base = {
  render: Template,
  args: {},
};
