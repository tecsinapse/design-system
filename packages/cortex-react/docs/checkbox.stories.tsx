import { StoryFn } from '@storybook/react';
import React from 'react';
import { checkbox } from '../../cortex-core/src';

export default {
  title: 'Cortex/Checkbox',
  component: <input />,
};

//TODO: create cortex-react checkbox
const Template: StoryFn = () => {
  return <input type={'checkbox'} className={checkbox()}></input>;
};

export const Base = {
  render: Template,
  args: {},
};
