import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { InputPassword } from '.';
import Input, { InputPasswordWebProps } from './InputPassword';

export default {
  title: 'react-web-kit/Input Password',
  component: Input,
};

const Template: StoryFn<InputPasswordWebProps> = args => {
  const [value, setValue] = useState<string>('');

  const onChange = text => {
    setValue(text);
    if (args.onChange) {
      args.onChange(text);
    }
  };

  return (
    <>
      <InputPassword
        {...args}
        label="Password"
        value={value}
        onChange={onChange}
        placeholder={args.placeholder}
      />
    </>
  );
};

export const Base = {
  render: Template,

  args: {
    onChange: value => action('onChange')(value),
    placeholder: 'Type your password',
    disabled: false,
  },
};
