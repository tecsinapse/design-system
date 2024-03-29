import React from 'react';
import { default as Avatar } from './Avatar';
import { Story } from '@storybook/react';
import { AvatarProps } from './types';

export default {
  title: 'Hybrid/Avatar',
  component: Avatar,
};

const Template: Story<AvatarProps> = args => <Avatar {...args} />;

export const Base = Template.bind({});

Base.args = {
  source: {
    uri: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
  },
  name: 'João',
  onPress: () => alert('onPress callback'),
  size: 'mega',
};
