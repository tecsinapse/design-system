import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { IconTextButton } from '@tecsinapse/react-native-kit';
import React from 'react';
import { View } from 'react-native';
import { ArtBoard } from '../ArtBoard';

storiesOf('IconTextButton', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('IconTextButton', () => (
    <View
      style={{
        flex: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '50%',
      }}
    >
      <View
        style={{
          flex: 0,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <IconTextButton
          variant={select('variant', ['filled', 'outlined', 'text'], 'filled')}
          size={select('size', ['small', 'default'], 'default')}
          iconProps={{
            name: 'rocket',
            type: 'font-awesome',
          }}
        />
      </View>

      <View
        style={{
          flex: 0,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <IconTextButton
          variant={select('variant', ['filled', 'outlined', 'text'], 'filled')}
          size={select('size', ['small', 'default'], 'default')}
          iconProps={{
            name: 'rocket',
            type: 'font-awesome',
          }}
          label={'Rocket Icon!'}
        />
      </View>

      <View>
        <IconTextButton
          variant={select('variant', ['filled', 'outlined', 'text'], 'filled')}
          size={select('size', ['small', 'default'], 'default')}
          label={'No Rocket Icon :('}
        />
      </View>
    </View>
  ));
