import React from 'react';
import { StoryFn } from '@storybook/react';
import { button } from '../../cortex-core/src';
import Tooltip from '../src/components/Tooltip';

export default {
  title: 'Cortex/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'select' },
    },
    width: {
      control: { type: 'number' },
    },
    height: {
      control: { type: 'number' },
    },
    trigger: {
      options: ['hover', 'click'],
      control: { type: 'radio' },
    },
    tooltipText: {
      control: { type: 'text' },
    },
  },
};

interface Test {
  placement: 'top' | 'bottom' | 'left' | 'right';
  width: number;
  height: number;
  trigger: 'hover' | 'click';
  tooltipText: string;
}

const Template: StoryFn<Test> = args => {
  return (
    <div className="h-[100px] mt-deca">
      <Tooltip
        tooltipText={args.tooltipText}
        trigger={args.trigger}
        placement={args.placement}
        width={args.width}
        height={args.height}
      >
        <button className={button({ intent: 'primary' })}>Teste Tooltip</button>
      </Tooltip>
    </div>
  );
};

export const Base = {
  render: Template,
  args: {
    placement: 'bottom',
    width: null,
    height: null,
    trigger: 'hover',
    tooltipText: 'teste',
  },
};
