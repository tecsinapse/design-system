import { Input } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof Input> = {
  title: 'Input',
  component: Input,
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    variant: 'default',
  },
};

export default StoryMeta;

type IStory = ComponentStory<typeof Input>;

export const Base = (args: IStory) => {
  const [value, setValue] = useState<string>('');

  return <Input {...args} value={value} onChange={setValue} />;
};

export const Variant = (args: IStory) => {
  const [value, setValue] = useState<string>('');

  return (
    <Input {...args} variant={'error'} value={value} onChange={setValue} />
  );
};
