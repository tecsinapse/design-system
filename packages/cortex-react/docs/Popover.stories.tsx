import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

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
        <Popover.Root
          placement={args.placement}
          trigger={args.trigger}
          controlled={false}
        >
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

export const ControlledPopover: StoryObj<typeof Popover.Root> = {
  args: {
    placement: 'bottom',
    trigger: 'click',
  },
  render: args => {
    const [show, setShow] = useState(false);
    return (
      <div className="h-[250px]">
        <Popover.Root
          placement={args.placement}
          trigger={args.trigger}
          controlled={true}
          isOpen={show}
          setIsOpen={setShow}
        >
          <Popover.Trigger>
            <button className={button({ intent: 'primary' })}>
              Trigger Element
            </button>
          </Popover.Trigger>
          <Popover.Content className="text-white">
            {[1, 2, 3, 4, 5].map(i => (
              <div
                className={'hover:bg-red-200 hover:cursor-pointer'}
                onClick={() => setShow(false)}
              >
                <p>Click in item {i} to close popover</p>
              </div>
            ))}
          </Popover.Content>
        </Popover.Root>
      </div>
    );
  },
};
