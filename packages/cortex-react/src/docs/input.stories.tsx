import React from 'react';
import { StoryFn } from '@storybook/react';
import { Input } from '../components';

export default {
  title: 'Cortex-React/Input/Root',
  component: <div />,
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    intent: 'default',
  },
  argTypes: {
    intent: {
      options: ['default', 'success', 'warning', 'error'],
      control: { type: 'select' },
    },
    label: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
  },
};

const Template: StoryFn = args => {
  return (
    <Input.Root
      variants={{ intent: args.intent }}
      label={args.label}
      placeholder={args.placeholder}
    />
  );
};

export const Base = {
  render: Template,
  args: {},
};
