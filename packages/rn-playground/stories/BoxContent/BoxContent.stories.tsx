import styled from '@emotion/native';
import { BoxContent, Text } from '@tecsinapse/react-native-kit';
import React from 'react';
import { Meta } from '@storybook/react';
import { BoxContentProps } from '@tecsinapse/react-core';

const StoryMeta: Meta<typeof BoxContent> = {
  title: 'BoxContent',
  component: BoxContent,
  args: {
    variant: 'bottom',
  },
};

export default StoryMeta;

export const Base = (args: BoxContentProps) => (
  <StyledBoxContent {...args}>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
  </StyledBoxContent>
);

const StyledBoxContent = styled(BoxContent)`
  align-items: center;
`;
