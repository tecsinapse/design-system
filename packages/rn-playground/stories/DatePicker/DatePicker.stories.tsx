import { DatePicker, DateRange } from '@tecsinapse/react-native-kit';
import React from 'react';
import { Meta } from '@storybook/react';
import { DatePickerProps } from '@tecsinapse/react-core';

const StoryMeta: Meta<typeof DatePicker> = {
  title: 'DatePicker',
  component: DatePicker,
  args: {
    label: 'Select date',
    placeholder: 'yyyy/MM/dd',
  },
};

export default StoryMeta;

export const Day = (args: DatePickerProps<'day'>) => {
  const [value, setValue] = React.useState<Date>();

  return (
    <DatePicker {...args} value={value} type={'day'} onChange={setValue} />
  );
};

export const Range = (args: DatePickerProps<'range'>) => {
  const [value, setValue] = React.useState<DateRange>();

  return (
    <DatePicker {...args} value={value} type={'range'} onChange={setValue} />
  );
};
