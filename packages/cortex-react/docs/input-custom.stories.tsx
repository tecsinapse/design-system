import React from 'react';
import { StoryFn } from '@storybook/react';
import { Input } from '../src';
import { IoEye, IoPerson } from 'react-icons/io5';

export default {
  title: 'Cortex/Input/Custom',
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
    <Input.Face variants={{ intent: args.intent }}>
      <Input.Left>
        <IoPerson size={16} />
      </Input.Left>
      <Input.Box label={args.label} placeholder={args.placeholder}></Input.Box>
      <Input.Right>
        <IoEye />
      </Input.Right>
    </Input.Face>
  );
};

export const Base = {
  render: Template,
  args: {},
};
