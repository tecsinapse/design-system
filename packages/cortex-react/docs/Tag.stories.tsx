import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tag } from '../src';

export default {
  title: 'Cortex/Tag',
  component: Tag.Root,
} as Meta<typeof Tag.Root>;

export const Default: StoryObj<typeof Tag.Root> = {
  args: {
    label: 'Primary',
    variants: {
      intent: 'primary',
    },
  },
  render: args => (
    <div className="flex gap-2">
      <Tag.Root variants={args.variants} label={`${args.label} root`} />
      <Tag.Root
        variants={args.variants}
        label={`${args.label} root dismissable`}
        onDismiss={() => console.log('dismiss')}
      />
      <Tag.Face variants={args.variants}>
        <Tag.Label>{`${args.label} composed`}</Tag.Label>
        <Tag.Close onClick={() => console.log('dismiss')} />
      </Tag.Face>
    </div>
  ),
};

export const Secondary: StoryObj<typeof Tag.Root> = {
  args: {
    label: 'Secondary',
    variants: {
      intent: 'secondary',
    },
  },
  render: args => <Tag.Root variants={args.variants} label={args.label} />,
};

export const Info: StoryObj<typeof Tag.Root> = {
  args: {
    label: 'Info',
    variants: {
      intent: 'info',
    },
  },
  render: args => <Tag.Root variants={args.variants} label={args.label} />,
};

export const White: StoryObj<typeof Tag.Root> = {
  args: {
    label: 'White',
    variants: {
      intent: 'white',
    },
  },
  render: args => <Tag.Root variants={args.variants} label={args.label} />,
};

export const Success: StoryObj<typeof Tag.Root> = {
  args: {
    label: 'Success',
    variants: {
      intent: 'success',
    },
  },
  render: args => <Tag.Root variants={args.variants} label={args.label} />,
};

export const Warning: StoryObj<typeof Tag.Root> = {
  args: {
    label: 'Warning',
    variants: {
      intent: 'warning',
    },
  },
  render: args => <Tag.Root variants={args.variants} label={args.label} />,
};

export const Error: StoryObj<typeof Tag.Root> = {
  args: {
    label: 'Error',
    variants: {
      intent: 'error',
    },
  },
  render: args => <Tag.Root variants={args.variants} label={args.label} />,
};
