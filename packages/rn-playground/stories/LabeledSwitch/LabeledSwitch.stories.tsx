import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import { LabeledSwitch } from '@tecsinapse/react-native-kit';
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

type IStory = ComponentStory<typeof LabeledSwitch>;

export const Base = (args: IStory) => {
  const [check1, setCheck1] = useState(false);
  const label = args?.args?.label ?? 'Labeled switch';

  return (
    <LabeledSwitch
      {...args}
      label={label}
      active={check1}
      onChange={setCheck1}
    />
  );
};
