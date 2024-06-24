import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { GroupButton, GroupButtonProps, GroupButtonValue } from '../src';

export default {
  title: 'Cortex/GroupButton',
  component: GroupButton,
  args: {},
  argTypes: {},
};

const options: GroupButtonValue<string>[] = [
  {
    value: 'Sim',
  },
  { value: 'Talvez' },
  { value: 'Não' },
];

const Template: StoryFn<GroupButtonProps<any>> = () => {
  const [value, setValue] = useState<string>(options[0].value);
  return (
    <GroupButton
      options={options}
      value={value}
      renderOption={option => option}
      renderKey={option => String(option)}
      onChange={option => {
        setValue(option);
      }}
    />
  );
};

export const Base = {
  render: Template,
  args: {},
};
