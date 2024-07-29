import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar } from '../src';

export default {
  title: 'Cortex/Avatar',
  component: Avatar,
} as Meta<typeof Avatar>;

export const Default: StoryObj<typeof Avatar> = {
  args: {
    src: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
    name: 'Steve Jobs',
  },
  render: args => (
    <Avatar
      onClick={() => alert('onClick callback')}
      name={args.name}
      src={args.src}
    />
  ),
};

/** No src provided */
export const NoSrc: StoryObj<typeof Avatar> = {
  args: {
    name: 'Steve Jobs',
  },
  render: args => (
    <Avatar onClick={() => alert('onClick callback')} name={args.name} />
  ),
};
