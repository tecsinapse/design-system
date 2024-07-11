import React from 'react';
import { StoryFn } from '@storybook/react';
import { Popover } from '../src/components';
import { button } from '@tecsinapse/cortex-core';

export default {
  title: 'Cortex/Popover',
  component: Popover,
  argTypes: {
    position: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'select' },
    },
    trigger: {
      options: ['hover', 'click'],
      control: { type: 'radio' },
    },
  },
  parameters: {
    controls: { exclude: ['children', 'content', 'placement', 'variants'] },
  },
};

type Position = 'bottom' | 'top' | 'left' | 'right';
type Trigger = 'hover' | 'click';

interface Test {
  position: Position;
  trigger: Trigger;
}

const Template: StoryFn<Test> = (args) => {
  return (
    <div className="h-[150px] mt-deca">
      <Popover.Root placement={args.position} trigger={args.trigger}>
        <Popover.Trigger>
          <button className={button({ intent: 'primary' })}>Teste Popover</button>
        </Popover.Trigger>
        <Popover.Content className="text-white">
          <div>Content of the Popover</div>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};

export const Base = Template.bind({});
Base.args = {
  position: 'bottom',
  trigger: 'click'
};
