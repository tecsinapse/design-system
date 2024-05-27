import React from 'react';
import { StoryFn } from '@storybook/react';
import { snackbar } from '../src';

export default {
  title: 'Cortex/Snackbar',
  component: <div />,
  argTypes: {
    intent: {
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      control: { type: 'select' },
    },
  },
};

const Template: StoryFn = args => {
  return (
    <div className={snackbar({ intent: args.intent })}>{args.description}</div>
  );
};

export const Base = {
  render: Template,

  args: {
    description: 'Message Snack',
  },
};
