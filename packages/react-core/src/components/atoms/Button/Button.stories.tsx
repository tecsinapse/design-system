import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import Text from '../Text/Text';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

interface ButtonPropsExtended extends ButtonProps {
  label: string;
}

const Template: Story<ButtonPropsExtended> = args => (
  <div style={{ width: 200 }}>
    <Button {...args}>
      <Text fontColor="light">{args.label}</Text>
    </Button>
  </div>
);

export const Base = Template.bind({});

Base.args = {
  onPress: action('onPress'),
  label: 'Button',
  color: 'primary',
  variant: 'filled',
  tone: 'medium',
};
