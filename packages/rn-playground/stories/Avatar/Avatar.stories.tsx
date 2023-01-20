import React from 'react';
import { ComponentMeta } from '@storybook/react-native';
import { Avatar } from '@tecsinapse/react-native-kit';

const StoryMeta: ComponentMeta<typeof Avatar> = {
  title: 'Avatar',
  component: Avatar,
};

export default StoryMeta;

export const Base = () => (
  <Avatar
    name="João"
    source={{
      uri: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
    }}
  />
);
