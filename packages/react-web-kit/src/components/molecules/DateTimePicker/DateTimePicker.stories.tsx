import { Story } from '@storybook/react';
import { DateTimePickerProps } from '@tecsinapse/react-core';
import { ptBR } from 'date-fns/locale';
import React from 'react';
import { DateTimePicker } from './DateTimePicker';

export default {
  title: 'Web/Date Time Picker',
  component: DateTimePicker,
};

const Template: Story<DateTimePickerProps> = ({ ...args }) => {
  const [value, setValue] = React.useState<Date>();

  return (
    <DateTimePicker
      label={'Select date and time'}
      placeholder={'Select date and time'}
      mode={'datetime'}
      value={value}
      onChange={setValue}
      locale={ptBR}
    />
  );
};

export const Base = Template.bind({});
