import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import Input, { InputWebProps } from './Input';

export default {
  title: 'Hybrid/Input',
  component: Input,
};

const Template: StoryFn<InputWebProps> = args => {
  const [value, setValue] = useState<string>('');

  const onChange = text => {
    setValue(text);
    if (args.onChange) {
      args.onChange(text);
    }
  };

  return (
    <Input
      {...args}
      label={args.label}
      value={value}
      onChange={onChange}
      placeholder={args.placeholder}
    />
  );
};

export const Base = {
  render: Template,

  args: {
    onChange: value => action('onChange')(value),
    placeholder: 'Type your e-mail',
    disabled: false,
    label: 'Login',
  },
};
