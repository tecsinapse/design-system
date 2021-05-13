import React from 'react';
import { Story } from '@storybook/react';
import { Text, TextProps } from './index';

export default {
  title: 'Components/Text',
  component: Text,
};

const Template: Story<TextProps> = ({ color, fontWeight, typography }) => (
  <Text color={color} fontWeight={fontWeight} typography={typography}>
    Text
  </Text>
);

export const Base = Template.bind({});

Base.args = {
  color: 'dark',
  fontWeight: 'regular',
  typography: 'h3',
};
