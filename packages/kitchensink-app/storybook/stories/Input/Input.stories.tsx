import { storiesOf } from '@storybook/react-native';
import { Input } from '@tecsinapse/react-native-kit';
import { Button, Text } from '@tecsinapse/react-web-kit/src';
import React from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Input', module)
  .addDecorator((getStory) => <ArtBoard>{getStory()}</ArtBoard>)
  .add('Input', () => {

    return (
      <Input 
        label="Say something"
        placeholder="Nop!"
      />
    )
  })