import styled from '@emotion/native';
import { Text, BoxContent } from '@tecsinapse/react-native-kit';
import React from 'react';
import { ComponentMeta } from '@storybook/react-native';
import { BoxContentProps } from '@tecsinapse/react-core';

const StoryMeta: ComponentMeta<typeof BoxContent> = {
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
