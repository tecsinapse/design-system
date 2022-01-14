import { storiesOf } from '@storybook/react-native';
import { DatePicker, DateRange } from '@tecsinapse/react-native-kit';
import React from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Input', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('DatePicker', () => <Component />);

const Component = () => {
  const [value, setValue] = React.useState<DateRange>();

  return <DatePicker
    value={value} 
    type={'range'} 
    onChange={setValue}
  />
};
