import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { GroupButton, GroupButtonValue } from '../src';

export default {
  title: 'Cortex/GroupButton',
  component: GroupButton,
  args: {},
  argTypes: {},
} as Meta<typeof GroupButton>;

export const Default: StoryObj<typeof GroupButton> = {
  args: {
    options: [
      {
        value: 'Sim',
      },
      { value: 'Talvez' },
      { value: 'Não' },
    ],
  },
  render: args => {
    const options = args.options as GroupButtonValue<string>[];
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
        disableAllOptions={args.disableAllOptions}
      />
    );
  },
};

export const CustomStyles: StoryObj<typeof GroupButton> = {
  args: {
    options: [
      {
        value: 'Sim',
      },
      { value: 'Talvez' },
      { value: 'Não' },
    ],
    customStyles: {
      active: 'bg-primary-medium',
      inactive: 'bg-info-light',
      firstButton: 'first:text-h3',
      lastButton: 'last:text-base',
    },
  },
  render: args => {
    const options = args.options as GroupButtonValue<string>[];
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
        customStyles={args.customStyles}
        disableAllOptions={args.disableAllOptions}
      />
    );
  },
};
