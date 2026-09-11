import React from 'react';
import { Meta } from '@storybook/react-vite';
import { Avatar, AvatarProps } from '@tecsinapse/cortex-native';

const StoryMeta: Meta<typeof Avatar> = {
  title: 'Avatar',
  component: Avatar,
  args: {
    name: 'João',
  },
};

export default StoryMeta;

export const Base = (args: AvatarProps) => (
  <Avatar
    {...args}
    source={{
      uri: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
    }}
  />
);

export const NoImage = {};
