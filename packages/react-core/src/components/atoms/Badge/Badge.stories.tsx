import React from 'react';
import { Badge, BadgeProps } from './index';
import { Story } from '@storybook/react';
import { Text } from '../Text/index';

export default {
  title: 'Components/Badge',
  component: Badge,
};

const Template: Story<BadgeProps> = args => (
  <Badge variant={args.variant}>
    <Text contrast>Badge</Text>
  </Badge>
);

export const Base = Template.bind({});

Base.args = {
  variant: 'success',
};
