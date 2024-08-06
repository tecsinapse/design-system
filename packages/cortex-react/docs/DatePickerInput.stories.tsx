import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { DatePickerInput, DateRangePickerInput } from '../src';

export default {
  title: 'Cortex/DatePickerInput',
  component: DatePickerInput,
  subcomponents: { DateRangePickerInput },
} as Meta<typeof DatePickerInput>;

export const Default: StoryObj<typeof DatePickerInput> = {
  render: () => {
    const [value, setValue] = useState(new Date());

    return (
      <div className={'w-[200px] h-[450px]'}>
        <DatePickerInput
          value={value}
          onChange={value => setValue(value)}
          label="Select date"
        />
      </div>
    );
  },
};

export const Range: StoryObj<typeof DateRangePickerInput> = {
  render: () => {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 2);
    const [value, setValue] = useState({ start, end });

    return (
      <div className={'w-[250px] h-[450px]'}>
        <DateRangePickerInput
          value={value}
          onChange={value => setValue(value)}
          label="Select date range"
        />
      </div>
    );
  },
};
