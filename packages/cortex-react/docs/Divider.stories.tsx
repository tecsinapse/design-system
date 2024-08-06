import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Divider } from '../src/components/Divider';

export default {
  title: 'Cortex/Divider',
  component: Divider,
} as Meta<typeof Divider>;

export const Default: StoryObj<typeof Divider> = {
  render: () => (
    <div className="w-[500px]">
      <Divider />
    </div>
  ),
};
