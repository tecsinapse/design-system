import { Card, Footer, Header, Text } from '@tecsinapse/react-native-kit';
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

const StoryMeta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
  argTypes: {
    onPress: { action: 'onPress callback' },
  },
};

export default StoryMeta;

type IStory = StoryFn<typeof Card>;

export const Base = (args: IStory) => (
  <Card {...args}>
    <Header>
      <Text>I'm a header card</Text>
    </Header>
    <Text>I'm a card</Text>
    <Footer>
      <Text>I'm a footer card</Text>
    </Footer>
  </Card>
);

export const Elevated = (args: IStory) => (
  <Card elevated {...args}>
    <Header>
      <Text>I'm a header card</Text>
    </Header>
    <Text>I'm an elevated card</Text>
    <Footer>
      <Text>I'm a footer card</Text>
    </Footer>
  </Card>
);
