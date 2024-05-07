import React from 'react';
import styled from '@emotion/native';
import { Paper, Text } from '@tecsinapse/react-native-kit';
import { Meta, StoryFn } from '@storybook/react';

const StoryMeta: Meta<typeof Paper> = {
  title: 'Paper',
  component: Paper,
};

export default StoryMeta;

type IStory = StoryFn<typeof Paper>;

export const Base = () => (
  <StyledPaper>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
  </StyledPaper>
);

export const Elevated = () => (
  <StyledPaper elevated>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
  </StyledPaper>
);

const StyledPaper = styled(Paper)`
  background-color: white;
`;
