import styled from '@emotion/native';
import { StoryFn } from '@storybook/react-vite';
import React from 'react';
import { BoxContent, BoxContentProps } from '.';
import { Text } from '../Text';

export default {
  title: 'react-core/Box Content',
  component: BoxContent,
};

const Template: StoryFn<BoxContentProps> = ({ ...rest }) => (
  <StyledBoxContent {...rest}>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
  </StyledBoxContent>
);

export const Base = {
  render: Template,

  args: {
    variant: 'bottom',
  },
};

const StyledBoxContent = styled(BoxContent)`
  align-items: center;
`;
