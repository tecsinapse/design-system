import React from 'react';
import { StoryFn } from '@storybook/react';
import { badge, containerBadge } from '../src';

export default {
  title: 'Cortex/Badge',
  component: <div />,
  argTypes: {
    intent: {
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      control: { type: 'select' },
    },
  },
};

const Template: StoryFn = args => {
  return (
    <div className={containerBadge()}>
      <div
        className={'rounded-full w-10 h-10 bg-info-light border border-black'}
      ></div>
      <div
        className={badge({
          intent: args.intent,
        })}
      >
        5
      </div>
    </div>
  );
};

export const Base = {
  render: Template,
  args: {},
};
