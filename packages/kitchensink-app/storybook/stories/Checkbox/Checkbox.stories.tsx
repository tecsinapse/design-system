import { storiesOf } from '@storybook/react-native';
import { Checkbox } from '@tecsinapse/react-native-kit/src';
import { Text } from '@tecsinapse/react-web-kit/src';
import React, { useState } from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Checkbox', module)
  .addDecorator((getStory) => <ArtBoard>{getStory()}</ArtBoard>)
  .add('Checkbox', () => <Check/>)


const Check = () => {
  const[ check, setCheck ] = useState(false)
  return (
    <Checkbox checked={check} labelPosition="right" onChange={(c) => {
      console.log("ha", c)
      setCheck(c)
    }}>
      <Text>I'm a checkbox</Text>
    </Checkbox>
  )
}