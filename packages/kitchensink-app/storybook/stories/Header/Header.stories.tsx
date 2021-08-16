import { storiesOf } from '@storybook/react-native';
import { Header } from '@tecsinapse/react-native-kit';
import React from 'react';
import { ArtBoard } from '../ArtBoard';
storiesOf('Header', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('Header', () => {
    return (
      <Header
        leftButton={{
          icon: {
            name: 'search-outline',
            type: 'ionicon',
            fontColor: 'light',
          },
        }}
        rightButton={{
          icon: {
            name: 'search-outline',
            type: 'ionicon',
            fontColor: 'light',
          },
        }}
      />
    );
  });
