import { StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { DateRange, RangeCalendar } from '../src';

export default {
  title: 'Cortex/Calendar/Range',
  component: RangeCalendar,
};

const Template: StoryFn = args => {
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 2)
  
  const [value, setValue] = useState<DateRange>({start: today, end: tomorrow})

  return (
    <>
      <RangeCalendar value={value} onChange={(date) => setValue(date)}/>
      <p>Intervalo selecionada</p>
      <p>{value.start?.toISOString()}</p>
      <p>{value.end?.toISOString()}</p>
    </>
  );
};

export const Base = {
  render: Template,
  args: {},
};
