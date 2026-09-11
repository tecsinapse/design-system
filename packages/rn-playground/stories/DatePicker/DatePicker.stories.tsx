import { Meta } from '@storybook/react-vite';
import {
  DatePicker,
  type DatePickerProps,
  type DateRange,
} from '@tecsinapse/cortex-native';
import React from 'react';

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
