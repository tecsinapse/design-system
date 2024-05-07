import React from 'react';
import { DateTimePicker } from '@tecsinapse/react-native-kit';
import { Meta, StoryFn } from '@storybook/react';

const StoryMeta: Meta<typeof DateTimePicker> = {
  title: 'DateTimePicker',
  component: DateTimePicker,
  args: {
    timeModalTitle: 'Selecione a hora desejada:',
    dateModalTitle: 'Selecione a data desejada:',
    dayLabel: 'Dia',
    monthLabel: 'Mês',
    yearLabel: 'Ano',
    hourLabel: 'Hora',
    minuteLabel: 'Minuto',
    timeConfirmButtonText: 'Confirmar',
    dateConfirmButtonText: 'Confirmar',
  },
};

export default StoryMeta;

type IStory = StoryFn<typeof DateTimePicker>;

export const Date = (args: IStory) => {
  const [date, setDate] = React.useState<Date>();

  return (
    <DateTimePicker
      {...args}
      value={date}
      onChange={setDate}
      mode={'date'}
      format={'dd/MM/yyyy'}
      label={'Select date'}
      style={{ marginBottom: 15 }}
    />
  );
};

export const Month = (args: IStory) => {
  const [month, setMonth] = React.useState<Date>();

  return (
    <DateTimePicker
      {...args}
      value={month}
      onChange={setMonth}
      mode={'month'}
      format={'MM/yyyy'}
      label={'Select month'}
      style={{ marginBottom: 15 }}
      offsetThreshold={15}
    />
  );
};

export const Time = (args: IStory) => {
  const [time, setTime] = React.useState<Date>();

  return (
    <DateTimePicker
      {...args}
      value={time}
      onChange={setTime}
      mode={'time'}
      label={'Select time'}
      format={'HH:mm'}
      style={{ marginBottom: 15 }}
    />
  );
};

export const DateTime = (args: IStory) => {
  const [dateTime, setDateTime] = React.useState<Date>();

  return (
    <DateTimePicker
      {...args}
      value={dateTime}
      onChange={setDateTime}
      mode={'datetime'}
      label={'Select date and time'}
      format={'dd/MM/yyyy HH:mm'}
    />
  );
};
