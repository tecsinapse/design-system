import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { Button } from '@tecsinapse/cortex-native';

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
  <Button {...args} title="Hello world" />
);
