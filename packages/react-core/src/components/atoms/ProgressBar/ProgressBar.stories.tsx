import React from 'react';
import { StoryFn } from '@storybook/react';
import { ProgressBar, ProgressBarProps } from './index';
import { Card } from '../Card';

export default {
  title: 'Hybrid/Progress Bar',
  component: ProgressBar,
};

const Template: StoryFn<ProgressBarProps> = ({ ...args }) => (
  <Card style={{ width: 400 }}>
    <ProgressBar {...args} />
  </Card>
);

export const Base = {
  render: Template,

  args: {
    valueNow: 80,
    segments: 5,
  },
};
