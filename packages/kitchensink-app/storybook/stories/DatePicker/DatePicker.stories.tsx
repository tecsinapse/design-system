import { storiesOf } from '@storybook/react-native';
import { Calendar } from '@tecsinapse/react-core';
import React from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Input', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('DatePicker', () => <Component />);

const Component = () => {
  const [value, setValue] = React.useState<(Date | undefined)[]>([]);

  return <Calendar type={'range'} value={value} onChange={setValue} />;
};
