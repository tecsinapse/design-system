import { storiesOf } from '@storybook/react-native';
import { Switch, Text } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Switch', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('Switch', () => <Component />);

const Component = () => {
  const [check, setCheck] = useState(false);
  return (
    <Switch active={check} onChange={setCheck}>
      <Text>I'm a switch</Text>
    </Switch>
  );
};
