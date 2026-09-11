import React from 'react';
import { Paper, Text } from '@tecsinapse/cortex-native';
import { Meta, StoryFn } from '@storybook/react-vite';

const StoryMeta: Meta<typeof Paper> = {
  title: 'Paper',
  component: Paper,
};

export default StoryMeta;

type IStory = StoryFn<typeof Paper>;

export const Base = () => (
  <Paper className="bg-content-minimal">
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
  </Paper>
);

export const Elevated = () => (
  <Paper elevated className="bg-content-minimal">
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
    <Text>I'm a paper</Text>
  </Paper>
);
