import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ArtBoard } from '../ArtBoard';
import { DateTimePicker } from '@tecsinapse/react-native-kit';
import * as dateFnsLocales from 'date-fns/locale'

storiesOf('Input', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('DateTimePicker', () => <Component />);

const commons = {
  timeModalTitle: 'Selecione a hora desejada:',
  dateModalTitle: 'Selecione a data desejada:',
  dayLabel: 'Dia',
  monthLabel: 'Mês',
  yearLabel: 'Ano',
  hourLabel: 'Hora',
  minuteLabel: 'Minuto',
  timeConfirmButtonText: 'Definir data',
  dateConfirmButtonText: 'Definir hora',
};

const Component = () => {
  const [date, setDate] = React.useState<Date>();
  const [month, setMonth] = React.useState<Date>();
  const [time, setTime] = React.useState<Date>();
  const [dateTime, setDateTime] = React.useState<Date>();


  return (
    <>
      <DateTimePicker
        value={date}
        onChange={setDate}
        mode={'date'}
        format={'dd/MM/yyyy'}
        label={'Select date'}
        style={{ marginBottom: 15 }}
        {...commons}
      />
      <DateTimePicker
        {...commons}
        value={month}
        onChange={setMonth}
        mode={'month'}
        format={'MM/yyyy'}
        label={'Select month'}
        style={{ marginBottom: 15 }}
        offsetThreshold={15}
      />
      <DateTimePicker
        value={time}
        onChange={setTime}
        mode={'time'}
        label={'Select time'}
        format={'HH:mm'}
        style={{ marginBottom: 15 }}
        {...commons}
      />
      <DateTimePicker
        value={dateTime}
        onChange={setDateTime}
        mode={'datetime'}
        label={'Select date and time'}
        format={'dd/MM/yyyy HH:mm'}
        locale={dateFnsLocales['ptBR']}
        {...commons}
      />
    </>
  );
};
