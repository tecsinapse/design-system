import { Story } from '@storybook/react';
import React from 'react';
import { ptBR } from 'date-fns/locale';
import DatePicker, { DatePickerProps } from './DatePicker';
import { DateRange } from '../Calendar';

export default {
  title: 'Hybrid/Date Picker',
  component: DatePicker,
};

const Template: Story<DatePickerProps<'range'>> = ({ ...args }) => {
  const [value, setValue] = React.useState<DateRange>();

  return (
    <DatePicker
      label={'Select date'}
      placeholder={'Select date'}
      type={'range'}
      value={value}
      onChange={setValue}
      locale={ptBR}
    />
  );
};

export const Base = Template.bind({});
