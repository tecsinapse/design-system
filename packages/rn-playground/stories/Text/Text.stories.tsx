import React from 'react';
import { Text } from '@tecsinapse/react-native-kit';
import { Meta, StoryFn } from '@storybook/react';

const TextMeta: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
  args: {
    textTransform: 'none',
    colorTone: undefined,
    colorVariant: undefined,
    fontColor: 'dark',
    capitalFirst: false,
    fontWeight: 'regular',
    ellipsizeMode: undefined,
    numberOfLines: undefined,
  },
};

export default TextMeta;

type TextStory = StoryFn<typeof Text>;

export const Base: TextStory = args => <Text {...args}>Hello World</Text>;
export const H1: TextStory = args => (
  <Text {...args} typography={'h1'} colorVariant={'success'}>
    Hello World
  </Text>
);
export const H2: TextStory = args => (
  <Text {...args} typography={'h2'} colorVariant={'error'}>
    Hello World
  </Text>
);
export const H3: TextStory = args => (
  <Text {...args} typography={'h3'} colorVariant={'warning'}>
    Hello World
  </Text>
);
export const H4: TextStory = args => (
  <Text {...args} typography={'h4'} colorVariant={'info'}>
    Hello World
  </Text>
);
export const H5: TextStory = args => (
  <Text {...args} typography={'h5'} colorVariant={'primary'}>
    Hello World
  </Text>
);
export const Sub: TextStory = args => (
  <Text
    {...args}
    typography={'sub'}
    colorVariant={'secondary'}
    fontWeight={'bold'}
  >
    Hello World
  </Text>
);
export const Label: TextStory = args => (
  <Text {...args} typography={'label'}>
    Hello World
  </Text>
);
