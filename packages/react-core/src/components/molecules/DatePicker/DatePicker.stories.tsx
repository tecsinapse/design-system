import { Story } from '@storybook/react';
import React from 'react';
import { ptBR } from 'date-fns/locale';
import DatePicker, { DatePickerProps } from './DatePicker';
import { DateRange } from '../Calendar';

export default {
  title: 'Hybrid/Date Picker',
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
  closeOnPick: true,
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
