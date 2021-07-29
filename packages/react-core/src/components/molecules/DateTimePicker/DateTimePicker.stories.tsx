import { Story } from '@storybook/react';
import React from 'react';
import { ptBR } from 'date-fns/locale';
import { DateTimePicker, DateTimePickerProps } from './index';

export default {
  title: 'Components/DateTimePicker',
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
