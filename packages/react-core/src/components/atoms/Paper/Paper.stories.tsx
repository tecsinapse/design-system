import React from 'react';
import { Paper } from './index';
import { Story } from '@storybook/react';

export default {
  title: 'Components/Paper',
  component: Paper,
};

const Template: Story = () => {
  return <Paper />;
};

export const Base = Template.bind({});
