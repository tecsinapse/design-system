import { StoryFn } from '@storybook/react';
import React from 'react';
import { Divider } from '../src/components/Divider';

export default {
  title: 'Cortex/Divider',
  component: Divider,
};

const Template: StoryFn = () => {
  return (
    <div className='w-[300px]'>
        <Divider/>
    </div>
  );
};

export const Base = {
  render: Template,
};
