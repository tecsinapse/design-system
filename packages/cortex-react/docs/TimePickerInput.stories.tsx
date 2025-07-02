import { Time } from '@internationalized/date';
import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TimePickerInput } from '../src/components';

export default {
  title: 'Cortex/TimePickerInput',
  component: TimePickerInput,
} as Meta<typeof TimePickerInput>;

export const Default: StoryObj<typeof TimePickerInput> = {
  args: {
    value: new Time(13, 35),
    label: 'Label',
    variants: {
      intent: 'default',
    },
    minuteInterval: 1,
  },
  render: args => {
    const [value, setValue] = useState<Time | undefined>(args.value);
    return (
      <TimePickerInput
        value={value}
        onChange={setValue}
        label={args.label}
        variants={args.variants}
        hourCycle={args.hourCycle}
        granularity={args.granularity}
        disabled={args.disabled}
        minuteInterval={args.minuteInterval}
      />
    );
  },
};
