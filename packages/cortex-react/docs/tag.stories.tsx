import React from 'react';
import { StoryFn } from '@storybook/react';
import { Tag } from '../src';

export default {
  title: 'Cortex/Tag',
  component: Tag,
  args: {
    intent: 'primary',
  },
  argTypes: {
    intent: {
      options: ['success', 'primary', 'secondary', 'info', 'white'],
      control: { type: 'select' },
    },
  },
};

const Template: StoryFn = args => {
  return (
    <div className={'flex flex-col justify-center items-center'}>
      <Tag variants={{ intent: args.intent }} label={'Intent color'} />
    </div>
  );
};

export const Base = {
  render: Template,
  args: {},
};
