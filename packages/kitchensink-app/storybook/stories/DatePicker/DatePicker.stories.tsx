import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ArtBoard } from '../ArtBoard';
import { DateRange } from '@tecsinapse/react-core/src/components/molecules/Calendar/Calendar';
import { DatePicker } from '@tecsinapse/react-native-kit';

storiesOf('Input', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('DatePicker', () => <Component />);

const Component = () => {
  const [value, setValue] = React.useState<DateRange>();

  return <DatePicker value={value} type={'range'} onChange={setValue}/>;
};
