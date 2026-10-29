import { InputPassword } from '@tecsinapse/cortex-native';
import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

const StoryMeta: Meta<typeof InputPassword> = {
  title: 'InputPassword',
  component: InputPassword,
  args: {
    label: 'Password',
    placeholder: 'Type your password',
  },
};

export default StoryMeta;

type IStory = StoryFn<typeof InputPassword>;

export const Base = (args: IStory) => {
  const [value, setValue] = useState<string>('password123');
  return <InputPassword {...args} value={value} onChange={setValue} />;
};
