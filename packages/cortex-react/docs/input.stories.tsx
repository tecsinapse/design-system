import { StoryFn } from '@storybook/react';
import React from 'react';
import { Input } from '../src';

export default {
  title: 'Cortex/Input',
  component: Input,
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
