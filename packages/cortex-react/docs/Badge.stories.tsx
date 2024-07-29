import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge, BadgeAnchor, Button } from '../src';

export default {
  title: 'Cortex/Badge',
  component: Badge,
  subcomponents: { BadgeAnchor },
} as Meta<typeof Badge>;

export const Default: StoryObj<typeof Badge> = {
  args: {
    value: 4,
    variants: {
      intent: 'primary',
    },
  },
  render: args => <Badge variants={args.variants} value={args.value} />,
};

export const Anchor: StoryObj<typeof BadgeAnchor> = {
  args: {
    value: 4,
    variants: {
      intent: 'primary',
      isAnchor: true,
    },
  },
  render: args => (
    <BadgeAnchor variants={args.variants} value={args.value}>
      <Button variants={{ variant: 'outline' }}>
        <p>Button</p>
      </Button>
    </BadgeAnchor>
  ),
};
