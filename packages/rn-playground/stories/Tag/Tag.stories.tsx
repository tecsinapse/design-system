import React from 'react';
import { type IconProps, Tag, type TagProps } from '@tecsinapse/cortex-native';
import { Meta } from '@storybook/react-vite';

const StoryMeta: Meta<typeof Tag> = {
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
