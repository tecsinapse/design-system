import React from 'react';
import { Badge, Icon } from '@tecsinapse/react-native-kit';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof Badge> = {
  title: 'Badge',
  component: Badge,
  args: {
    value: 6,
  },
};

export default StoryMeta;

type IStory = ComponentStory<typeof Badge>;
export const Base = (args: IStory) => {
  const value = args?.args?.value ?? 5;
  return (
    <Badge color="primary" value={value}>
      <Icon name="user-circle" type="font-awesome" size="mega" />
    </Badge>
  );
};
