import React from 'react';
import { Story } from '@storybook/react';
import Hello from './Hello';

export default {
  title: 'Lab/Hello',
  component: Hello,
};

const Template: Story = args => {
  return <Hello />;
};

export const Base = Template.bind({});

Base.args = {};
