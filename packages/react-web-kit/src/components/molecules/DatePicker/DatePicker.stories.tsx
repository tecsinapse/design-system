import { StoryFn } from '@storybook/react';
import { DatePickerProps, DateRange } from '@tecsinapse/react-core';
import { ptBR } from 'date-fns/locale';
import React from 'react';
import { DatePicker } from './DatePicker';

export default {
  title: 'react-web-kit/Date Picker',
  component: DatePicker,
};

const Template: StoryFn<DatePickerProps<'range'>> = args => {
  const [value, setValue] = React.useState<DateRange>();

  return (
    <DatePicker {...args} value={value} onChange={setValue} locale={ptBR} />
  );
};

export const Range = {
  render: Template,

  args: {
    label: 'Select date',
    placeholder: 'Select date',
    type: 'range',
    closeOnPick: false,
  },
};

const TemplateDay: StoryFn<DatePickerProps<'day'>> = args => {
  const [value, setValue] = React.useState<Date>();

  return (
    <DatePicker {...args} value={value} onChange={setValue} locale={ptBR} />
  );
};

export const Day = {
  render: TemplateDay,

  args: {
    label: 'Select date',
    placeholder: 'Select date',
    type: 'day',
    closeOnPick: true,
  },
};
