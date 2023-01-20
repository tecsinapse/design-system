import React from 'react';
import { Badge, BadgeNativeProps, Icon } from '@tecsinapse/react-native-kit';
import { ComponentMeta } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof Badge> = {
  title: 'Badge',
  component: Badge,
  args: {
    value: 5,
    color: 'primary',
  },
};

export default StoryMeta;

export const Base = (args: BadgeNativeProps) => (
  <Badge {...args}>
    <Icon name="user-circle" type="font-awesome" size="mega" />
  </Badge>
);
