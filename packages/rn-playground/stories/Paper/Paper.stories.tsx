import React from 'react';
import styled from '@emotion/native';
import { Paper, Text } from '@tecsinapse/react-native-kit';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof Paper> = {
  title: 'Paper',
  component: Paper,
};

export default StoryMeta;

type IStory = ComponentStory<typeof Paper>;

export const Base = () => (
  <StyledPaper>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
  </StyledPaper>
);

const StyledPaper = styled(Paper)`
  background-color: white;
`;
