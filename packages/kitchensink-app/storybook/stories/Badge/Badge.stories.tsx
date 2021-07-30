import { storiesOf } from '@storybook/react-native';
import {Badge, Icon} from '@tecsinapse/react-native-kit';
import React from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Badge', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('Badge', () => (
    <Badge color="primary" value={5}>
        <Icon name="user-circle" type="font-awesome" size="mega" />
    </Badge>
  ));
