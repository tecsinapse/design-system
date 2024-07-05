import { StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { Input } from '../src';

export default {
  title: 'Cortex/Input/Search',
  component: Input,
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    intent: 'default',
  },
  argTypes: {
    intent: {
      options: ['default', 'success', 'warning', 'error'],
      control: { type: 'select' },
    },
    label: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
  },
};

const Template: StoryFn = args => {
  const [value, setValue] = useState('')  

  return (
    <div className={'flex flex-col gap-y-mili'}>
      <Input.Search 
        placeholder={args.placeholder} 
        label={args.label}
        onChange={(e) => setValue(e.target?.value)}
        defaultValue={value}
      />
    </div>
  );
};

export const Base = {
  render: Template,
  args: {},
};
