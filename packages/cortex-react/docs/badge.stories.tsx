import React from 'react';
import { StoryFn } from '@storybook/react';
import { Badge } from '../src';
import { defaultIntents } from './utils';

export default {
  title: 'Cortex/Badge',
  component: Badge,
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
