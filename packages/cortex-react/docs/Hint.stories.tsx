import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Hint } from '../src';

export default {
  title: 'Cortex/Hint',
  component: Hint,
} as Meta<typeof Hint>;

export const Default: StoryObj<typeof Hint> = {
  args: {
    variants: {
      intent: 'default',
    },
  },
  render: args => <Hint variants={args.variants}>Default hint</Hint>,
};

export const Success: StoryObj<typeof Hint> = {
  args: {
    variants: {
      intent: 'success',
    },
  },
  render: args => <Hint variants={args.variants}>Success hint</Hint>,
};

export const Warning: StoryObj<typeof Hint> = {
  args: {
    variants: {
      intent: 'warning',
    },
  },
  render: args => <Hint variants={args.variants}>Warning hint</Hint>,
};

export const Error: StoryObj<typeof Hint> = {
  args: {
    variants: {
      intent: 'error',
    },
  },
  render: args => <Hint variants={args.variants}>Error hint</Hint>,
};

export const CustomChildren: StoryObj<typeof Hint> = {
  render: args => (
    <Hint variants={args.variants}>
      <div className="bg-primary-medium text-on-primary px-deca py-micro">
        Div Hint
      </div>
    </Hint>
  ),
};
