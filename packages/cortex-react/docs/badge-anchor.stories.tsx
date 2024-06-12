import React from 'react';
import { StoryFn } from '@storybook/react';
import { BadgeAnchor, Button } from '../src';
import { defaultIntents } from './utils';

export default {
  title: 'Cortex/Badge/Anchor',
  component: BadgeAnchor,
  args: {
    value: 1,
    intent: 'primary',
  },
  argTypes: {
    intent: {
      options: defaultIntents,
      control: { type: 'select' },
    },
    value: {
      control: { type: 'number' },
      min: 1,
      max: 9,
    },
  },
};

const Template: StoryFn = args => {
  return (
    <BadgeAnchor
      variants={{ intent: args.intent, isAnchor: true }}
      value={args.value}
    >
      <Button variants={{ variant: 'outline' }}>
        <p>Button</p>
      </Button>
    </BadgeAnchor>
  );
};

export const Base = {
  render: Template,
  args: {},
};
