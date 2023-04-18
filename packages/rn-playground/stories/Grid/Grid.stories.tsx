import {
  Button,
  Grid,
  GridItem,
  Input,
  PressableSurface,
  Select,
  Text,
} from '@tecsinapse/react-native-kit';
import React from 'react';
import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

const options = new Array(20).fill(undefined).map((_, index) => ({
  key: index,
  label: `Option ${index}`,
}));

const StoryMeta: ComponentMeta<typeof Grid> = {
  title: 'Grid',
  component: Grid,
  subcomponents: { GridItem },
};

export default StoryMeta;

export const Base = () => {
  return (
    <>
      <Grid spacing={'mili'}>
        <GridItem
          span={6}
          spacing={{
            top: 'giga',
            bottom: 'giga',
            left: 'nano',
            right: 'nano',
          }}
          wrapper
        >
          <Input value={''} onChange={() => {}} />
        </GridItem>
        <GridItem
          span={6}
          spacing={{
            top: 'giga',
            bottom: 'giga',
            left: 'nano',
            right: 'nano',
          }}
          wrapper
        >
          <Input value={''} onChange={() => {}} />
        </GridItem>
        <GridItem span={12} wrapper>
          <Input value={''} onChange={() => {}} />
        </GridItem>
        <GridItem span={12} wrapper>
          <Button>
            <Text fontColor={'light'}>Button 12</Text>
          </Button>
        </GridItem>
        <GridItem span={6} wrapper>
          <View>
            <Button>
              <Text fontColor={'light'}>Button 6.1</Text>
            </Button>
          </View>
        </GridItem>
        <GridItem span={6} wrapper>
          <Button>
            <Text fontColor={'light'}>Button 6.2</Text>
          </Button>
        </GridItem>

        <GridItem
          span={12}
          wrapper
          spacing={{
            top: 'mili',
            left: 'giga',
            right: 'giga',
          }}
        >
          <PressableSurface style={{ backgroundColor: 'cyan' }}>
            <Text>Pressable</Text>
          </PressableSurface>
        </GridItem>

        <GridItem span={12}>
          <Select
            options={options}
            label="Single value"
            placeholder="Select one value"
            value={undefined}
            type={'single'}
            hideSearchBar
            onSelect={() => {}}
            selectModalTitle={'Selecione uma opção'}
            labelExtractor={item => item.label}
            searchBarPlaceholder={'Busque uma opção'}
            confirmButtonText={'Confirmar'}
            keyExtractor={item => String(item.key)}
          />
        </GridItem>
        <GridItem span={6} wrapper flexGrow={2} flexBasis={'auto'}>
          <View
            style={{ backgroundColor: 'red', height: 50, width: '100%' }}
          ></View>
        </GridItem>
        <GridItem
          span={6}
          wrapper
          flexGrow={1}
          flexShrink={1}
          flexBasis={'auto'}
        >
          <View style={{ backgroundColor: 'red', height: 50 }}></View>
        </GridItem>
      </Grid>
    </>
  );
};
