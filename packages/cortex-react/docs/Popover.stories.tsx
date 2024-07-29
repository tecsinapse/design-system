import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { button } from '@tecsinapse/cortex-core';
import { Popover } from '../src';

export default {
  title: 'Cortex/Popover',
  component: Popover.Root,
  subcomponents: { Trigger: Popover.Trigger, Content: Popover.Content },
} as Meta<typeof Popover.Root>;

export const Default: StoryObj<typeof Popover.Root> = {
  args: {
    placement: 'bottom',
    trigger: 'hover',
  },
  render: args => {
    return (
      <div className="h-[250px]">
        <Popover.Root placement={args.placement} trigger={args.trigger}>
          <Popover.Trigger>
            <button className={button({ intent: 'primary' })}>
              Trigger Element
            </button>
          </Popover.Trigger>
          <Popover.Content className="text-white">
            <div>Content of the Popover</div>
          </Popover.Content>
        </Popover.Root>
      </div>
    );
  },
};
