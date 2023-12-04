import React from 'react';
import { StoryFn } from '@storybook/react';
import { checkbox } from '@tecsinapse/cortex-core';

export default {
  title: 'Lab/Checkbox',
  component: <input />,
};

const Template: StoryFn = () => {
  return (
    <>
      {/*<input type={'checkbox'} className={checkbox()} />*/}
      <input type={'checkbox'} className={checkbox()}></input>
    </>
  );
};

export const Base = Template.bind({});

Base.args = {};
