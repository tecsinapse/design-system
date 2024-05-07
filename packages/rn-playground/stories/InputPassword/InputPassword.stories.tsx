import { InputPassword } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

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
