import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Button, Text } from '@tecsinapse/react-native-kit';

const ButtonMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
};

export default ButtonMeta;

type ButtonStory = StoryFn<typeof Button>;

export const Basic: ButtonStory = args => (
  <Button {...args}>
    <Text fontColor="light" fontWeight="bold">
      Hello world
    </Text>
  </Button>
);
