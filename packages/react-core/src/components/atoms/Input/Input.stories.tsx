import React, { useState } from 'react';
import { Story } from '@storybook/react';
import Input, { InputProps } from './Input';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Input',
  component: Input,
};

const Template: Story<InputProps> = args => {
  const { defaultValue = '' } = args;
  const [value, setValue] = useState<string | number>(defaultValue);

  return (
    <Input
      {...args}
      value={value}
      onChange={text => setValue(text)}
      placeholder={args.placeholder}
    />
  );
};

export const Base = Template.bind({});

Base.args = {
  onChange: action('onClick'),
  placeholder: 'Name',
  defaultValue: '',
  disabled: false,
};
