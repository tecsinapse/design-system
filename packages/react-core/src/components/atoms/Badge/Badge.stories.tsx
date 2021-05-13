import React from 'react';
import { Badge, BadgeProps } from './index';
import { Story } from '@storybook/react';
import { Text } from '../Text/index';

export default {
  title: 'Components/Badge',
  component: Badge,
};

const Template: Story<BadgeProps> = ({ color, borderRadius, tone }) => (
  <Badge color={color} borderRadius={borderRadius} tone={tone}>
    <Text>Badge</Text>
  </Badge>
);

export const Base = Template.bind({});

Base.args = {
  color: 'success',
  borderRadius: 'circle',
  tone: 'light',
};
