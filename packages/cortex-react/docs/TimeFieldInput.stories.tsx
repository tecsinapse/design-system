import { Time } from '@internationalized/date';
import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TimeFieldInput } from '../src';

export default {
  title: 'Cortex/TimeFieldInput',
  component: TimeFieldInput,
} as Meta<typeof TimeFieldInput>;

export const Default: StoryObj<typeof TimeFieldInput> = {
  args: {
    value: new Time(13, 35),
    label: 'Label',
    variants: {
      intent: 'default',
    },
  },
  render: args => {
    const [value, setValue] = useState<Time | undefined>(args.value);
    return (
      <div className="w-[100px]">
        <TimeFieldInput
          value={value}
          onChange={setValue}
          label={args.label}
          variants={args.variants}
          hourCycle={args.hourCycle}
          granularity={args.granularity}
          disabled={args.disabled}
        />
      </div>
    );
  },
};
