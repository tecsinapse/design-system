import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProgressBar } from '../src';

export default {
  title: 'Cortex/ProgressBar',
  component: ProgressBar,
} as Meta<typeof ProgressBar>;

export const Default: StoryObj<typeof ProgressBar> = {
  args: {
    valueCurrent: 75,
    segments: 3,
    valueMin: 0,
    valueMax: 100,
    intentProgress: 'default',
    animated: true,
  },
  render: args => (
    <div className={'w-[500px]'}>
      <ProgressBar
        segments={args.segments}
        valueCurrent={args.valueCurrent}
        intentProgress={args.intentProgress}
        valueMax={args.valueMax}
        valueMin={args.valueMin}
        animated={args.animated}
      />
    </div>
  ),
};
