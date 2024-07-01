import { StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { DatePickerInput } from '../src';

export default {
  title: 'Cortex/DatePickerInput',
  component: DatePickerInput,
};

const Template: StoryFn = () => {
  const [value, setValue] = useState(new Date());
  
  return <>
    <DatePickerInput value={value} onChange={(value) => setValue(value)} label='Select date'/>
  </>
};

export const Base = {
  render: Template,
  args: {},
};
