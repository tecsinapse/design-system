import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Grid, GridItem, IconTextButton } from '@tecsinapse/react-native-kit';
import React from 'react';
import { View } from 'react-native';
import { ArtBoard } from '../ArtBoard';

storiesOf('IconTextButton', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('IconTextButton', () => (
    <Grid spacing={'mili'}>
      <GridItem span={12} wrapper>
        <IconTextButton
          variant={select('variant', ['filled', 'outlined', 'text'], 'filled')}
          size={select('size', ['small', 'default'], 'default')}
          iconProps={{
            name: 'rocket',
            type: 'font-awesome',
          }}
          label={'Rocket Icon!'}
        />
      </GridItem>

      <GridItem span={2} wrapper>
        <IconTextButton
          variant={select('variant', ['filled', 'outlined', 'text'], 'filled')}
          size={select('size', ['small', 'default'], 'default')}
          iconProps={{
            name: 'rocket',
            type: 'font-awesome',
          }}
        />
      </GridItem>

      <GridItem span={12} wrapper>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <IconTextButton
            variant={select(
              'variant',
              ['filled', 'outlined', 'text'],
              'filled'
            )}
            size={select('size', ['small', 'default'], 'default')}
            label={'No Rocket Icon :('}
          />
        </View>
      </GridItem>
    </Grid>
  ));
