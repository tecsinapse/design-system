import React from 'react';
import { default as Badge, BadgeProps } from './Badge';
import { Story } from '@storybook/react';

export default {
  title: 'Badge',
  component: Badge,
};

const Template: Story<BadgeProps> = args => <Badge variant={args.variant}/>;

export const Base = Template.bind({});

Base.args = {
  variant: 'info'
}
