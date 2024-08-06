import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TimeFieldInput, TimeValueType } from '../src';

export default {
  title: 'Cortex/TimeFieldInput',
  component: TimeFieldInput,
} as Meta<typeof TimeFieldInput>;

export const Default: StoryObj<typeof TimeFieldInput> = {
  args: {
    value: { hour: 13, minute: 35 },
    label: 'Label',
    variants: {
      intent: 'default',
    },
  },
  render: args => {
    const [value, setValue] = useState<TimeValueType>(
      args.value ?? { hour: 0, minute: 0 }
    );
    return (
      <>
        <TimeFieldInput
          value={value}
          onChange={setValue}
          label={args.label}
          variants={args.variants}
        />
      </>
    );
  },
};
