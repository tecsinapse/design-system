import React from 'react';
import { Avatar } from '.';

export default {
  title: 'Components/Avatar',
  component: Avatar,
};

const Template = args => <Avatar {...args} />;

export const Base = Template.bind({});

// @ts-ignore
Base.args = {
  srcImage:
    'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
  name: 'João',
  onPress: () => console.log('click'),
};
