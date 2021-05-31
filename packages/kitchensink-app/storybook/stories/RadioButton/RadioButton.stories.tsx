import { storiesOf } from '@storybook/react-native';
import { RadioButton, Text } from '@tecsinapse/react-core';
import React, { useState } from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Radio Button', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('Radio Button', () => <Component />);

const Component = () => {
  const [check, setCheck] = useState(0);
  return (
    <>
      <RadioButton checked={check === 0} onChange={() => setCheck(0)}>
        <Text>I'm a radio button</Text>
      </RadioButton>
      <RadioButton checked={check === 1} onChange={() => setCheck(1)}>
        <Text>I'm a radio button</Text>
      </RadioButton>
    </>
  );
};
