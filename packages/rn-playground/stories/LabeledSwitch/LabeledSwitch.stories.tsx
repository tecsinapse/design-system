import { ComponentMeta } from '@storybook/react-native';
import {
  LabeledSwitch,
  LabeledSwitchNativeProps,
} from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';

const StoryMeta: ComponentMeta<typeof LabeledSwitch> = {
  title: 'LabeledSwitch',
  component: LabeledSwitch,
  args: {
    label: 'Labeled switch',
    labelPosition: 'right',
  },
};

export default StoryMeta;

export const Base = (args: LabeledSwitchNativeProps) => {
  const [check1, setCheck1] = useState(false);

  return <LabeledSwitch {...args} active={check1} onChange={setCheck1} />;
};
