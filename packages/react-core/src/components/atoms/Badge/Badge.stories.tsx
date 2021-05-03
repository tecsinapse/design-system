import React from 'react';
import { default as Badge, BadgeProps } from './Badge';
import { Story } from '@storybook/react';
import { Text } from '@tecsinapse/react-core';

export default {
  title: 'Badge',
  component: Badge,
};

const Template: Story<BadgeProps> = args => (
  <Badge variant={args.variant}>
    <Text contrast>Badge</Text>
  </Badge>
);

export const Base = Template.bind({});

Base.args = {
  variant: 'info',
};
