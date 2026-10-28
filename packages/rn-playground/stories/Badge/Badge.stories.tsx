import React from 'react';
import { Meta } from '@storybook/react-vite';
import { Badge, BadgeProps, Icon, Text } from '@tecsinapse/cortex-native';

const StoryMeta: Meta<typeof Badge> = {
  title: 'Badge',
  component: Badge,
  args: {
    value: 5,
    color: 'primary',
  },
};

export default StoryMeta;

export const Base = (args: BadgeProps) => (
  <Badge
    {...args}
    value={
      <Text fontColor="light" fontWeight="bold" typography="label">
        {args.value}
      </Text>
    }
  >
    <Icon name="user-circle" type="font-awesome" size="mega" />
  </Badge>
);
