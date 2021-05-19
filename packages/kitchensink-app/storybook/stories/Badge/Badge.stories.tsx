import { storiesOf } from '@storybook/react-native';
import { Badge, Text } from '@tecsinapse/react-core/src';
import React from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Badge', module)
  
  .addDecorator((getStory) => <ArtBoard>{getStory()}</ArtBoard>)
  
  .add('Badge', () => (
      <Badge color="primary">
        <Text>I'm a badge</Text>
      </Badge>
  ))
