import { Story } from '@storybook/react';
import React from 'react';
import { Card } from '../Card';
import { Text } from '../Text';
import Divider, { DividerProps } from './Divider';

export default {
  title: 'Hybrid/Divider',
  component: Divider,
};

const Template: Story<DividerProps> = ({ ...args }) => {
  return (
    <Card>
      <Text>Some content here!</Text>
      <Divider {...args}>
        <Text>Some content here!</Text>
      </Divider>
      <Text>Some content here!</Text>
    </Card>
  );
};

export const Base = Template.bind({});

Base.args = {
  linePosition: 'bottom',
};
