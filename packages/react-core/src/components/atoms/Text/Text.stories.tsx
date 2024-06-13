import { StoryFn } from '@storybook/react';
import React from 'react';
import { Text, TextProps } from './index';

export default {
  title: 'react-web-kit/Text',
  component: Text,
};

const Template: StoryFn<TextProps> = ({
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

export const Base = {
  render: Template,

  args: {
    fontColor: 'dark',
    fontWeight: 'regular',
    typography: 'h3',
  },
};
