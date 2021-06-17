import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import Input, { InputWebProps } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
};

const Template: Story<InputWebProps> = args => {
  const [value, setValue] = useState<string>();

  const onChange = text => {
    setValue(text);
    if (args.onChange) {
      args.onChange(text);
    }
  };

  return (
    <Input
      {...args}
      label="Login"
      value={value}
      onChange={onChange}
      placeholder={args.placeholder}
    />
  );
};

export const Base = Template.bind({});

Base.args = {
  onChange: value => action('onChange')(value),
  placeholder: 'Type your e-mail',
  disabled: false,
};
