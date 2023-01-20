import React from 'react';
import { Tag, IconProps } from '@tecsinapse/react-native-kit';

import { ComponentMeta, ComponentStory } from '@storybook/react-native';

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

type IStory = ComponentStory<typeof Tag>;

export const Base = (args: IStory) => {
  return (
    <Tag
      value={args?.args?.value ?? 'Label'}
      {...args}
      icon={{ name: 'stopwatch', type: 'fontisto' } as IconProps}
    />
  );
};
