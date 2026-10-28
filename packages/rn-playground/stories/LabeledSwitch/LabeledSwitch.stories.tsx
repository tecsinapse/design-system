import { Meta } from '@storybook/react-vite';
import {
  LabeledSwitch,
  type LabeledSwitchNativeProps,
} from '@tecsinapse/cortex-native';
import React, { useState } from 'react';

const StoryMeta: Meta<typeof LabeledSwitch> = {
  title: 'LabeledSwitch',
  component: LabeledSwitch,
  args: {
    rightLabel: 'Labeled switch',
  },
};

export default StoryMeta;

export const Base = (args: LabeledSwitchNativeProps) => {
  const [check1, setCheck1] = useState(false);

  return <LabeledSwitch {...args} active={check1} onChange={setCheck1} />;
};
