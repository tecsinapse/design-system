import React from 'react';
import { StoryFn } from '@storybook/react';
import { hint } from '@tecsinapse/cortex-core';

export default {
  title: 'Lab/Hint',
  component: <div />,
};

const Template: StoryFn = () => {
  return (
    <div className={hint({ intent: 'error' })}>
      <p>Error</p>
    </div>
  );
};

export const Base = Template.bind({});

Base.args = {};
