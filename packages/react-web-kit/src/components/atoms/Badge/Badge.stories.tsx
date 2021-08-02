import { Story } from '@storybook/react';
import { Icon } from '@tecsinapse/react-core';
import { BadgeWebProps } from './Badge';
import React from 'react';
import { Badge } from '.';

export default {
  title: 'Components/Badge',
  component: Badge,
};

const Template: Story<BadgeWebProps> = ({ color, fontColor, tone }) => (
    <Badge color={color} tone={tone} value={5} fontColor={fontColor}>
      <Icon name={'user-circle'} type={'font-awesome'} size={'mega'}/>
    </Badge>
);

export const Base = Template.bind({});

Base.args = {
  color: 'primary',
  fontColor: 'light',
  tone: 'medium',
};