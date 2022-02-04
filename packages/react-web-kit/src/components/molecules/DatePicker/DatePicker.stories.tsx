import { Story } from '@storybook/react';
import { DatePickerProps, DateRange } from '@tecsinapse/react-core';
import { ptBR } from 'date-fns/locale';
import React from 'react';
import { DatePicker } from './DatePicker';

export default {
  title: 'Web/Date Picker',
  component: DatePicker,
};

const Template: Story<DatePickerProps<'range'>> = args => {
  const [value, setValue] = React.useState<DateRange>();

  return (
    <DatePicker {...args} value={value} onChange={setValue} locale={ptBR} />
  );
};

export const Range = Template.bind({});

Range.args = {
  label: 'Select date',
  placeholder: 'Select date',
  type: 'range',
  closeOnPick: false,
};

const TemplateDay: Story<DatePickerProps<'day'>> = args => {
  const [value, setValue] = React.useState<Date>();

  return (
    <DatePicker {...args} value={value} onChange={setValue} locale={ptBR} />
  );
};

export const Day = TemplateDay.bind({});

Day.args = {
  label: 'Select date',
  placeholder: 'Select date',
  type: 'day',
  closeOnPick: true,
};
