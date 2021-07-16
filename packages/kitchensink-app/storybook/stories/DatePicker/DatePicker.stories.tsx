import { storiesOf } from '@storybook/react-native';
import { Calendar } from '@tecsinapse/react-core';
import React from 'react';
import { ArtBoard } from '../ArtBoard';
import { DateRange } from '@tecsinapse/react-core/src/components/molecules/Calendar/Calendar';
import { ptBR } from 'date-fns/locale';

storiesOf('Input', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('DatePicker', () => <Component />);

const Component = () => {
  const [value, setValue] = React.useState<DateRange>();

  return (
    <Calendar type={'range'} value={value} onChange={setValue} locale={ptBR} />
  );
};
