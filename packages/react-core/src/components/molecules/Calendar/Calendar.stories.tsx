import { Story } from '@storybook/react';
import React from 'react';
import { Calendar, CalendarProps } from './index';
import { DateRange } from './Calendar';
import { ptBR } from 'date-fns/locale';

export default {
  title: 'Components/Calendar',
  component: Calendar,
};

const Template: Story<CalendarProps<'range'>> = ({ ...args }) => {
  const [value, setValue] = React.useState<DateRange>();

  return (
    <Calendar style={{ width: 500, height: 500 }} type={'range'} value={value} onChange={setValue} locale={ptBR} />
  );
};

export const Base = Template.bind({});
