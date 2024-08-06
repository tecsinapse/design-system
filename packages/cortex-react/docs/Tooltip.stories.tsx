import { Meta, StoryObj } from '@storybook/react';
import { button } from '@tecsinapse/cortex-core';
import React from 'react';
import { Tooltip } from '../src';

export default {
  title: 'Cortex/Tooltip',
  component: Tooltip,
} as Meta<typeof Tooltip>;

export const Default: StoryObj<typeof Tooltip> = {
  args: {
    placement: 'bottom',
    trigger: 'hover',
    text: 'teste',
  },
  render: args => (
    <div className="h-[300px]">
      <Tooltip
        text={args.text}
        trigger={args.trigger}
        placement={args.placement}
        width={args.width}
        height={args.height}
      >
        <button className={button({ intent: 'primary' })}>
          Tooltip Element
        </button>
      </Tooltip>
    </div>
  ),
};
