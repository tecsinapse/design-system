import React from 'react';
import { Story } from '@storybook/react';
import Button, { ButtonProps } from './Button';
import Text from '../Text/Text';
import { action } from '@storybook/addon-actions';

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
      <Text>{args.label}</Text>
    </Button>
  </div>
);

export const Base = Template.bind({});

Base.args = {
  onClick: action('onClick'),
  label: 'Button',
  color: 'primary',
  variant: 'filled',
  tone: 'medium',
};
