import { storiesOf } from '@storybook/react-native';
import { Avatar, Text } from '@tecsinapse/react-core';
import React from 'react';
import { ArtBoard } from '../ArtBoard';
import { View } from 'react-native';

storiesOf('Avatar', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('Avatar', () => <AvatarStories />);

const AvatarStories = () => (
  <View style={{ flexDirection: 'row' }}>
    <Avatar
      name="Ryan"
      // srcImage="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
    />
    <Text typography="h5" style={{ marginLeft: 10 }}>
      Olá Denner{' '}
    </Text>
  </View>
);
