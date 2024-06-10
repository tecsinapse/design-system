import React from 'react';
import { StoryFn } from '@storybook/react';
import { Tag } from '../index';

export default {
  title: 'Cortex-React/Tag',
  component: <div />,
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
      <div className={'flex flex-row gap-x-deca mt-giga'}>
        <Tag variants={{ intent: 'primary' }} label={'Tag label'} />
        <Tag variants={{ intent: 'success' }} label={'Tag label'} />
        <Tag variants={{ intent: 'info' }} label={'Tag label'} />
        <Tag variants={{ intent: 'secondary' }} label={'Tag label'} />
        <Tag variants={{ intent: 'white' }} label={'Tag label'} />
      </div>
    </div>
  );
};

export const Base = {
  render: Template,
  args: {},
};
