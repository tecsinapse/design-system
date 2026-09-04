import { Card, CardFooter, CardHeader, Text } from '@tecsinapse/cortex-native';
import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

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
    <CardHeader>
      <Text>I'm a header card</Text>
    </CardHeader>
    <Text>I'm a card</Text>
    <CardFooter>
      <Text>I'm a footer card</Text>
    </CardFooter>
  </Card>
);

export const Elevated = (args: IStory) => (
  <Card elevated {...args}>
    <CardHeader>
      <Text>I'm a header card</Text>
    </CardHeader>
    <Text>I'm an elevated card</Text>
    <CardFooter>
      <Text>I'm a footer card</Text>
    </CardFooter>
  </Card>
);
