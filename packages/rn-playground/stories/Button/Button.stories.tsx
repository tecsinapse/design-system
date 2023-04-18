import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Button, Text } from '@tecsinapse/react-native-kit';

const ButtonMeta: ComponentMeta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
};

export default ButtonMeta;

type ButtonStory = ComponentStory<typeof Button>;

export const Basic: ButtonStory = args => (
  <Button {...args}>
    <Text fontColor="light" fontWeight="bold">
      Hello world
    </Text>
  </Button>
);
