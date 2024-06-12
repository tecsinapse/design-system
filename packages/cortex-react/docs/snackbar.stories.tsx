import React from 'react';
import { StoryFn } from '@storybook/react';
import { Snackbar } from '../src';
import { defaultIntents } from './utils';

export default {
  title: 'Cortex/Snackbar',
  component: Snackbar,
  args: {
    intent: 'primary',
  },
  argTypes: {
    intent: {
      options: defaultIntents,
      control: { type: 'select' },
    },
  },
};

const Template: StoryFn = args => {
  return (
    <Snackbar show={true} variants={{ intent: args.intent }}>
      <p>Description snackbar</p>
    </Snackbar>
  );
};

export const Base = {
  render: Template,
  args: {},
};
