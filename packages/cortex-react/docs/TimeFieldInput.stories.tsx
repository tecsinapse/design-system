import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { TimeFieldInput, TimeValueType } from '../src';

export default {
  title: 'Cortex/TimeFieldInput',
  component: TimeFieldInput,
  argTypes: {
    intent: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error'],
    },
  },
};

const Template: StoryFn = args => {
  const [value, setValue] = useState<TimeValueType>();
  return (
    <>
      <TimeFieldInput
        value={value}
        onChange={setValue}
        label={args.label}
        variants={{ intent: args.intent }}
      />
    </>
  );
};

export const Base = {
  render: Template,
  args: {
    label: 'Label',
    intent: 'default',
  },
};
