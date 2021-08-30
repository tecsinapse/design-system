import React from 'react';
import { Story } from '@storybook/react';
import { ProgressBar, ProgressBarProps } from './index';
import { Card } from '../Card';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
};

const Template: Story<ProgressBarProps> = ({ ...args }) => (
  <Card style={{ width: 400 }}>
    <ProgressBar {...args} />
  </Card>
);

export const Base = Template.bind({});

Base.args = {
  valueNow: 80,
  animate: true,
  segments: 5,
  animationParameters: {
    direction: 'left',
    duration: 5000,
  },
};
