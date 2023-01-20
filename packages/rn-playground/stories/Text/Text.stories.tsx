import React from 'react';
import { Text } from '@tecsinapse/react-native-kit';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

const TextMeta: ComponentMeta<typeof Text> = {
  title: 'Text',
  component: Text,
};

export default TextMeta;

type TextStory = ComponentStory<typeof Text>;

export const Base: TextStory = args => <Text {...args}>Hello World</Text>;
