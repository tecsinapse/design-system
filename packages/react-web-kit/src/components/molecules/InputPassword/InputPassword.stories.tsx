import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { InputPassword } from '.';
import Input, { InputPasswordWebProps } from './InputPassword';

export default {
  title: 'Components/InputPassword',
  component: Input,
};

const Template: Story<InputPasswordWebProps> = args => {
  const [value, setValue] = useState<string>();

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

export const Base = Template.bind({});

Base.args = {
  onChange: value => action('onChange')(value),
  placeholder: 'Type your password',
  disabled: false,
};
