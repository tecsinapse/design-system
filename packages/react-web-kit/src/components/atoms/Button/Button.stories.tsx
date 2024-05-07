import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Text } from '@tecsinapse/react-core';
import React from 'react';
import Button, { WebButtonProps } from './Button';

export default {
  title: 'Hybrid/Button',
  component: Button,
};

interface ButtonPropsExtended extends WebButtonProps {
  label: string;
}

const Template: StoryFn<ButtonPropsExtended> = args => (
  <div style={{ width: 200 }}>
    <Button {...args}>
      <Text fontWeight="bold" fontColor="light">
        {args.label}
      </Text>
    </Button>
  </div>
);

export const Base = {
  render: Template,

  args: {
    onPress: e => action('onPress')(e),
    label: 'Button',
    color: 'primary',
    variant: 'filled',
    tone: 'medium',
    size: 'small',
  },
};
