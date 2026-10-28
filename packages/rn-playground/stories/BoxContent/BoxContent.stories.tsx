import { BoxContent, BoxContentProps, Text } from '@tecsinapse/cortex-native';
import React from 'react';
import { Meta } from '@storybook/react-vite';

const StoryMeta: Meta<typeof BoxContent> = {
  title: 'BoxContent',
  component: BoxContent,
  args: {
    variant: 'bottom',
  },
};

export default StoryMeta;

export const Base = (args: BoxContentProps) => (
  <BoxContent {...args} style={{ alignItems: 'center' }}>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
  </BoxContent>
);
