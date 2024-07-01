import { StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { DateRange, DateRangePickerInput } from '../src';

export default {
  title: 'Cortex/DateRangePickerInput',
  component: DateRangePickerInput,
};

const Template: StoryFn = () => {
  const [value, setValue] = useState<DateRange>({start: new Date(), end: new Date()});
  
  return <>
    <DateRangePickerInput value={value} onChange={(value) => setValue(value)} label='Select date'/>
  </>
};

export const Base = {
  render: Template,
  args: {},
};
