import { StoryFn } from '@storybook/react';
import { Icon } from '@tecsinapse/react-core';
import { BadgeWebProps } from './Badge';
import React from 'react';
import { Badge } from '.';

export default {
  title: 'Hybrid/Badge',
  component: Badge,
};

const Template: StoryFn<BadgeWebProps> = ({ color, fontColor, tone }) => (
  <Badge color={color} tone={tone} value={5} fontColor={fontColor}>
    <Icon name={'user-circle'} type={'font-awesome'} size={'mega'} />
  </Badge>
);

export const Base = {
  render: Template,

  args: {
    color: 'primary',
    fontColor: 'light',
    tone: 'medium',
  },
};
