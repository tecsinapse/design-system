import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ArtBoard } from '../ArtBoard';
import { DateTimePicker } from '@tecsinapse/react-native-kit';

storiesOf('Input', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('DateTimePicker', () => <Component />);

const Component = () => {
  const [value, setValue] = React.useState<Date>();

  return <DateTimePicker value={value} onChange={setValue} />;
};
