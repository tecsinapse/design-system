import { Switch, SwitchProps } from '@tecsinapse/react-native-kit';
import React, { useEffect, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof Switch> = {
  title: 'Switch',
  component: Switch,
  args: {
    active: false,
  },
};

export default StoryMeta;

export const Base = (args: SwitchProps) => {
  const [check, setCheck] = useState(args?.active);
  return <Switch active={check} onChange={setCheck} />;
};
