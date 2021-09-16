import { Story } from '@storybook/react';
import React from 'react';
import { Text, TextProps } from './index';

export default {
  title: 'Hybrid/Text',
  component: Text,
};

const Template: Story<TextProps> = ({
  fontColor,
  fontWeight,
  typography,
  ...args
}) => (
  <Text
    {...args}
    fontColor={fontColor}
    fontWeight={fontWeight}
    typography={typography}
  >
    Text
  </Text>
);

export const Base = Template.bind({});

Base.args = {
  fontColor: 'dark',
  fontWeight: 'regular',
  typography: 'h3',
};
