import styled from '@emotion/native';
import { storiesOf } from '@storybook/react-native';
import {
  Card,
  CardProps,
  Footer,
  Header,
  StyleProps,
  Text,
} from '@tecsinapse/react-core';
import React from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Card', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('Plain', () => (
    <Card onPress={() => console.log('Wow!')}>
      <Header>
        <Text>I'm a header card</Text>
      </Header>
      <Text>I'm a card</Text>
      <Footer>
        <Text>I'm a footer card</Text>
      </Footer>
    </Card>
  ))

  .add('Elevated', () => (
    <Card elevated onPress={() => console.log('Wow!')}>
      <Header>
        <Text>I'm a header card</Text>
      </Header>
      <Text>I'm an elevated card</Text>
      <Footer>
        <Text>I'm a footer card</Text>
      </Footer>
    </Card>
  ));
