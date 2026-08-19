import React from 'react';
import { Paper, Text } from '@tecsinapse/react-native-kit';
import { Meta, StoryFn } from '@storybook/react-vite';

const StoryMeta: Meta<typeof Paper> = {
  title: 'Paper',
  component: Paper,
};

export default StoryMeta;

type IStory = StoryFn<typeof Paper>;

export const Base = () => (
  <Paper style={{ backgroundColor: 'white' }}>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
  </Paper>
);

export const Elevated = () => (
  <Paper elevated style={{ backgroundColor: 'white' }}>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
  </Paper>
);
