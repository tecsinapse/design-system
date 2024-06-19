import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { GroupButton, GroupButtonValue } from '../src';

export default {
  title: 'Cortex/GroupButton',
  component: <div />,
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

const Template: StoryFn = () => {
  const [value, setValue] = useState<string>(options[0].value);
  return (
    <GroupButton
      options={options}
      value={value}
      renderOption={option => option}
      renderKey={option => {
        return option;
      }}
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
