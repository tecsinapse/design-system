import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import { Text } from '@tecsinapse/react-core';
import React from 'react';
import Button, { WebButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

interface ButtonPropsExtended extends WebButtonProps {
  label: string;
}

const Template: Story<ButtonPropsExtended> = args => (
  <div style={{ width: 200 }}>
    <Button {...args}>
      <Text fontWeight="bold" fontColor="light">
        {args.label}
      </Text>
    </Button>
  </div>
);

export const Base = Template.bind({});

Base.args = {
  onPress: e => action('onPress')(e),
  label: 'Button',
  color: 'primary',
  variant: 'filled',
  tone: 'medium',
  size: 'small',
};
