import { storiesOf } from '@storybook/react-native';
import { Avatar } from '@tecsinapse/react-core';
import React from 'react';
import { ArtBoard } from '../ArtBoard';
import { View } from 'react-native';
import styled from '@emotion/native';

storiesOf('Avatar', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('Avatar', () => <AvatarStories />);

const AvatarStories = () => (
  <StyledContainer>
    <Avatar
      name="João"
      source={{
        uri:
          'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
      }}
    />
  </StyledContainer>
);

const StyledContainer = styled(View)`
  align-items: center;
`;
