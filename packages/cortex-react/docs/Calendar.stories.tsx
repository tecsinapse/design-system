import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Calendar, DateRange, RangeCalendar } from '../src';

export default {
  title: 'Cortex/Calendar',
  component: Calendar,
  subcomponents: { RangeCalendar },
} as Meta<typeof Calendar>;

export const Default: StoryObj<typeof Calendar> = {
  render: () => {
    const [value, setValue] = useState(new Date());

    return <Calendar value={value} onChange={value => setValue(value)} />;
  },
};

export const Range: StoryObj<typeof RangeCalendar> = {
  render: () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);

    const [value, setValue] = useState<DateRange>({
      start: today,
      end: tomorrow,
    });

    return <RangeCalendar value={value} onChange={date => setValue(date)} />;
  },
};
