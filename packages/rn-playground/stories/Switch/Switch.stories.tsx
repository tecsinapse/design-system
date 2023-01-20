import { Switch } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof Switch> = {
  title: 'Switch',
  component: Switch,
  args: {
    active: false,
  },
};

export default StoryMeta;

type IStory = ComponentStory<typeof Switch>;

export const Base = (args: IStory) => {
  const [check, setCheck] = useState(args?.args?.active ?? false);
  return <Switch active={check} onChange={setCheck} />;
};
