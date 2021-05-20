import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Button, Text } from '@tecsinapse/react-core/src';
import React from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Button', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('Button', () => (
    <Button
      variant={select('variant', ['filled', 'outlined', 'text'], 'filled')}
      onClick={() => console.log('Wow!')}
    >
      <Text>I'm a button</Text>
    </Button>
  ));
