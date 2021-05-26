import { Story } from '@storybook/react';
import { BadgeProps, Text } from '@tecsinapse/react-core';
import React from 'react';
import { Badge } from '.';

export default {
  title: 'Components/Badge',
  component: Badge,
};

const Template: Story<BadgeProps> = ({ color, variant, tone }) => (
  <Badge color={color} variant={variant} tone={tone}>
    <Text colorVariant="dark">Badge</Text>
  </Badge>
);

export const Base = Template.bind({});

Base.args = {
  color: 'success',
  variant: 'pill',
  tone: 'medium',
};
