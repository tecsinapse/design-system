import React from 'react';
import { Tag, IconProps, TagProps } from '@tecsinapse/react-native-kit';
import { ComponentMeta } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof Tag> = {
  title: 'Tag',
  component: Tag,
  argTypes: {
    onDismiss: { action: 'dismiss callback' },
  },
  args: {
    value: 'Label',
    variant: 'small',
    dismiss: true,
  },
};

export default StoryMeta;

export const Base = (args: TagProps) => {
  return (
    <Tag
      {...args}
      icon={{ name: 'stopwatch', type: 'fontisto' } as IconProps}
    />
  );
};
