import React from 'react';
import { StoryFn } from '@storybook/react';
import { button } from '../src';

export default {
  title: 'Cortex/Button',
  component: <button />,
  argTypes: {
    intent: {
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      control: { type: 'select' },
    },
    variant: {
      options: ['default', 'text', 'outline'],
      control: { type: 'radio' },
    },
  },
};

const Template: StoryFn = args => {
  return (
    <button
      disabled={false}
      className={button({ intent: args.intent, variant: args.variant })}
      onClick={() => console.debug('CLICK')}
    >
      Button
    </button>
  );
};

export const Base = {
  render: Template,
  args: {},
};
