import React from 'react';
import { StoryFn } from '@storybook/react';
import { ProgressBar } from '../src';

export default {
  title: 'Cortex/ProgressBar',
  component: <div />,
  argTypes: {
    intentProgress: {
      options: ['default', 'success', 'warning', 'error', 'info'],
      control: { type: 'select' },
    },
  },
};

const Template: StoryFn = args => {
  return (
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
  );
};

export const Base = {
  render: Template,
  args: {
    valueCurrent: 75,
    segments: 3,
    valueMin: 0,
    valueMax: 100,
    intentProgress: 'default',
    animated: true,
  },
};
