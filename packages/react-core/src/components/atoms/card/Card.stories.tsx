import { Story } from '@storybook/react';
import React from 'react';
import { Card } from './Card';

export default {
  title: 'Card',
  component: Card,
};

const Template: Story = () => <Card />;

export const Base = Template.bind({});
