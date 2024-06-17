import React from 'react';
import { StoryFn } from '@storybook/react';
import { Avatar } from '../src';

export default {
  title: 'Cortex/Avatar',
  component: <div />,
};

const Template: StoryFn = args => {
  return (
    <Avatar
      onClick={() => alert('onClick callback')}
      name={args.name}
      src={args.src}
    />
  );
};

export const Base = {
  render: Template,
  args: {
    src: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
    name: 'Elon Musk',
  },
};
