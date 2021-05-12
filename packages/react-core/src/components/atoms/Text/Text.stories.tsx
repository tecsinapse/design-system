import React from 'react';
import { Story } from '@storybook/react';
import { Text, TextProps } from './index';

export default {
  title: 'Text',
  component: Text,
};

const Template: Story<TextProps> = ({
  variantColor,
  fontWeight,
  typography,
}) => (
  <Text
    variantColor={variantColor}
    fontWeight={fontWeight}
    typography={typography}
  >
    Text
  </Text>
);

export const Base = Template.bind({});

Base.args = {
  variantColor: 'dark',
  fontWeight: 'regular',
  typography: 'h3',
};
