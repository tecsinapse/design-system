import { storiesOf } from '@storybook/react-native';
import { text, select } from '@storybook/addon-knobs';
import { Button, Text } from '@tecsinapse/react-core/src';
import React from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Button', module)
  
  .addDecorator((getStory) => <ArtBoard>{getStory()}</ArtBoard>)
  
  .add('Button', () => (
      <Button variant={select("variant", ["filled", "outlined"], "filled")} onClick={() => console.log("----")}>
        <Text>I'm a button</Text>
      </Button>
  ))
