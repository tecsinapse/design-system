import { InputPassword } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof InputPassword> = {
  title: 'InputPassword',
  component: InputPassword,
  args: {
    label: 'Password',
    placeholder: 'Type your password',
  },
};

export default StoryMeta;

type IStory = ComponentStory<typeof InputPassword>;

export const Base = (args: IStory) => {
  const [value, setValue] = useState<string>('password123');
  return <InputPassword {...args} value={value} onChange={setValue} />;
};
