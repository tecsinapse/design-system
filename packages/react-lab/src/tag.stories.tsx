import React from 'react';
import { StoryFn } from '@storybook/react';
import { tag } from '@tecsinapse/cortex-core/src/components';

export default {
  title: 'Lab/Tag',
  component: <div />,
  argTypes: {
    intent: {
      options: ['primary', 'secondary', 'success', 'info', 'white'],
      control: { type: 'select' },
    },
  },
};

const Template: StoryFn = args => {
  return (
    <div
      className={tag({
        intent: args.intent,
      })}
    >
      <p>Tag</p>
    </div>
  );
};

export const Base = Template.bind({});

Base.args = {};
