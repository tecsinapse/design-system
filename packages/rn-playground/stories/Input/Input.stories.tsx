import { Input } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

const StoryMeta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    variant: 'default',
  },
};

export default StoryMeta;

type IStory = StoryFn<typeof Input>;

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
