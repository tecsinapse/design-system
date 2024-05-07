import { Switch, SwitchProps } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { Meta } from '@storybook/react';

const StoryMeta: Meta<typeof Switch> = {
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
