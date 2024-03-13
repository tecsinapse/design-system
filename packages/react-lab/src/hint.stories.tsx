import React from 'react';
import { StoryFn } from '@storybook/react';
import { hint } from '@tecsinapse/cortex-core';

export default {
  title: 'Lab/Hint',
  component: <div />,
  argTypes: {
    intent: {
      options: ['default', 'success', 'warning', 'error'],
      control: { type: 'select' },
    },
  },
};

const Template: StoryFn = args => {
  return (
    <div className={hint({ intent: args.intent })}>
      <p>Error</p>
    </div>
  );
};

export const Base = Template.bind({});

Base.args = {};
