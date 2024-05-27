import React from 'react';
import { Icon } from '@tecsinapse/react-native-kit';
import { Meta, StoryFn } from '@storybook/react';

const IconMeta: Meta<typeof Icon> = {
  title: 'Icon',
  component: Icon,
  args: {
    name: 'rocket',
    type: 'font-awesome',
    size: 'kilo',
  },
};

export default IconMeta;

type IconStory = StoryFn<typeof Icon>;

export const Base = ({ args }: IconStory) => (
  <Icon
    {...args}
    type={args?.type ?? 'font-awesome'}
    name={args?.name ?? 'rocket'}
  />
);
