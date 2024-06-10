import React from 'react';
import { StoryFn } from '@storybook/react';
import { Badge } from '../index';
import { defaultIntents } from './utils';

export default {
  title: 'Cortex-React/Badge',
  component: <div />,
  args: {
    value: '1',
    intent: 'primary',
  },
  argTypes: {
    intent: {
      options: defaultIntents,
      control: { type: 'select' },
    },
    value: {
      control: { type: 'text' },
    },
  },
};

const Template: StoryFn = args => {
  return <Badge variants={{ intent: args.intent }} value={args.value ?? '2'} />;
};

export const Base = {
  render: Template,
  args: {},
};
