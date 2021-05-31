import { storiesOf } from '@storybook/react-native';
import { Text } from '@tecsinapse/react-native-kit';
import React from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Text', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('Text', () => <Text>I'm a text</Text>);
