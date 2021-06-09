import styled from '@emotion/native';
import { Story } from '@storybook/react';
import React from 'react';
import { StyleProps } from '../../../../dist';
import { Card } from '../Card';
import { Text } from '../Text';
import Divider, { DividerProps } from './Divider';

export default {
  title: 'Components/Divider',
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
