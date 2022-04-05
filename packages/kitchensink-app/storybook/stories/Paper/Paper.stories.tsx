import styled from '@emotion/native';
import { storiesOf } from '@storybook/react-native';
import { Paper, Text } from '@tecsinapse/react-native-kit';
import React from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Paper', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('Paper', () => (
    <StyledPaper>
      <Text>I'm a paper</Text>
      <Text>I'm a paper</Text>
      <Text>I'm a paper</Text>
      <Text>I'm a paper</Text>
    </StyledPaper>
  ));

const StyledPaper = styled(Paper)`
  background-color: white;
`;
