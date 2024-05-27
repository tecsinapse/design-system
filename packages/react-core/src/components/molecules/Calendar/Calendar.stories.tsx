import { StoryFn } from '@storybook/react';
import React from 'react';
import { Calendar, CalendarProps } from './index';
import { DateRange } from './Calendar';
import { ptBR } from 'date-fns/locale';

export default {
  title: 'Hybrid/Calendar',
  component: Calendar,
};

const Template: StoryFn<CalendarProps<'range'>> = ({ ...args }) => {
  const [value, setValue] = React.useState<DateRange>();

  return (
    <Calendar type={'range'} value={value} onChange={setValue} locale={ptBR} />
  );
};

export const Base = {
  render: Template,
};
