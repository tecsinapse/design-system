import React from 'react';
import { ProgressBar, type ProgressBarProps } from '@tecsinapse/cortex-native';
import { Meta } from '@storybook/react-vite';

const StoryMeta: Meta<typeof ProgressBar> = {
  title: 'ProgressBar',
  component: ProgressBar,
  args: {
    valueMax: 100,
    valueNow: 50,
    valueMin: 0,
    color: 'success',
    segments: 4,
  },
};

export default StoryMeta;

export const Base = (args: ProgressBarProps) => {
  return <ProgressBar {...args} />;
};
