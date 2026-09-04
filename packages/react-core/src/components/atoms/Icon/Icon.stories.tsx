import React from 'react';
import { StoryFn } from '@storybook/react-vite';
import Icon, { IconProps } from './Icon';

export default {
  title: 'react-core/Icon',
  component: Icon,
};

const Template: StoryFn<IconProps> = ({ name, type, size, ...args }) => (
  <Icon {...args} name={name} size={size} type={type} />
);

export const Base = {
  render: Template,

  args: {
    name: 'rocket',
    type: 'font-awesome',
    size: 'kilo',
    fontColor: 'dark',
  },
};
