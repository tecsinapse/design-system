import React from 'react';
import { StoryFn } from '@storybook/react';
import { tag } from '../src';

export default {
  title: 'Cortex/Tag',
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

export const Base = {
  render: Template,
  args: {},
};
