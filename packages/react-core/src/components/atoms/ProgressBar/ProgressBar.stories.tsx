import React from 'react';
import { Story } from '@storybook/react';
import { ProgressBar, ProgressBarProps } from './index';
import { Card } from '../Card';

export default {
  title: 'Components/Progress Bar',
  component: ProgressBar,
};

const Template: Story<ProgressBarProps> = ({ ...args }) => (
  <Card style={{ width: 400 }}>
    <ProgressBar {...args} />
  </Card>
);

export const Base = Template.bind({});

Base.args = {
  valueNow: 50,
};
