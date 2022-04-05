import styled from '@emotion/native';
import { storiesOf } from '@storybook/react-native';
import { Text, BoxContent } from '@tecsinapse/react-native-kit';
import React from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('BoxContent', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('BoxContent', () => (
    <StyledBoxContent variant="bottom">
      <Text>Some text here!</Text>
      <Text>Some text here!</Text>
      <Text>Some text here!</Text>
      <Text>Some text here!</Text>
      <Text>Some text here!</Text>
    </StyledBoxContent>
  ));

const StyledBoxContent = styled(BoxContent)`
  align-items: center;
`;
