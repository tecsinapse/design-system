import React from 'react';
import { Icon } from '@tecsinapse/react-native-kit';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

const IconMeta: ComponentMeta<typeof Icon> = {
  title: 'Icon',
  component: Icon,
  args: {
    name: 'rocket',
    type: 'font-awesome',
    size: 'kilo',
  },
};

export default IconMeta;

type IconStory = ComponentStory<typeof Icon>;

export const Base: IconStory = args => <Icon {...args} />;
