import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tag } from '../src';

export default {
  title: 'Cortex/Tag',
  component: Tag,
  args: {
    intent: 'primary',
  },
  argTypes: {
    intent: {
      options: ['success', 'primary', 'secondary', 'info', 'white'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof Tag>;

export const Default: StoryObj<typeof Tag> = {
  args: {
    label: 'Primary',
    variants: {
      intent: 'primary',
    },
  },
  render: args => <Tag variants={args.variants} label={args.label} />,
};

export const Secondary: StoryObj<typeof Tag> = {
  args: {
    label: 'Secondary',
    variants: {
      intent: 'secondary',
    },
  },
  render: args => <Tag variants={args.variants} label={args.label} />,
};

export const Info: StoryObj<typeof Tag> = {
  args: {
    label: 'Info',
    variants: {
      intent: 'info',
    },
  },
  render: args => <Tag variants={args.variants} label={args.label} />,
};

export const White: StoryObj<typeof Tag> = {
  args: {
    label: 'White',
    variants: {
      intent: 'white',
    },
  },
  render: args => <Tag variants={args.variants} label={args.label} />,
};

export const Success: StoryObj<typeof Tag> = {
  args: {
    label: 'Success',
    variants: {
      intent: 'success',
    },
  },
  render: args => <Tag variants={args.variants} label={args.label} />,
};
