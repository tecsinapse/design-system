import { storiesOf } from '@storybook/react-native';
import React, { useState } from 'react';
import { ArtBoard } from '../ArtBoard';
import { Input, Select, SelectDate, Text } from '@tecsinapse/react-native-kit';

storiesOf('Input', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('SelectDate', () => {
    return <Component />;
  });

const Component = () => {
  const [date, setDate] = useState<string | undefined>('01/2021');

  return (
    <SelectDate
      value={date}
      onSelect={setDate}
      upperDateThreshold={'Mar/2021'}
      lowerDateThreshold={'Jan/2021'}
    />
  );
};
