import { StoryFn } from '@storybook/react';
import { DateTimePickerProps } from '@tecsinapse/react-core';
import { ptBR } from 'date-fns/locale';
import React from 'react';
import { DateTimePicker } from './DateTimePicker';

export default {
  title: 'Web/Date Time Picker',
  component: DateTimePicker,
};

const Template: StoryFn<DateTimePickerProps> = ({ ...args }) => {
  const [value, setValue] = React.useState<Date>();

  return (
    <DateTimePicker value={value} onChange={setValue} locale={ptBR} {...args} />
  );
};

export const Base = {
  render: Template,

  args: {
    mode: 'datetime',
    format: 'dd/MM/yyyy HH:mm',
    label: 'Select date and time',
    placeholder: 'Select date and time',
  },
};
