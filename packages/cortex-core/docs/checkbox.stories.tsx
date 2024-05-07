import React from 'react';
import { StoryFn } from '@storybook/react';
import { checkbox } from '../src';

export default {
  title: 'Cortex/Checkbox',
  component: <input />,
};

const Template: StoryFn = () => {
  return <input type={'checkbox'} className={checkbox()}></input>;
};

export const Base = {
  render: Template,
  args: {},
};
