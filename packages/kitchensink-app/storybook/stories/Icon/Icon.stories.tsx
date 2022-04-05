import { storiesOf } from '@storybook/react-native';
import { Icon } from '@tecsinapse/react-native-kit';
import React from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Icon', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('Icon', () => <Icon name="rocket" type="font-awesome" size="kilo" />);
