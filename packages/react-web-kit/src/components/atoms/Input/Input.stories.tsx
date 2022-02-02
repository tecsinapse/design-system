import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import Input, { InputWebProps } from './Input';
import { Masks } from '@tecsinapse/react-core/src';

export default {
  title: 'Hybrid/Input',
  component: Input,
};

const Template: Story<InputWebProps> = args => {
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

export const Base = Template.bind({});

Base.args = {
  onChange: value => action('onChange')(value),
  placeholder: 'Type your e-mail',
  disabled: false,
  label: 'Login',
};

const TemplateStringMask: Story<InputWebProps> = args => {
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
      mask={Masks.CPF}
    />
  );
};

export const StringMask = TemplateStringMask.bind({});

StringMask.args = {
  onChange: value => action('onChange')(value),
  placeholder: 'Type your cpf',
  disabled: false,
  label: 'CPF',
};

const TemplateNumberMask: Story<InputWebProps> = args => {
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
      mask={Masks.CPF}
    />
  );
};

export const NumberMask = TemplateNumberMask.bind({});

NumberMask.args = {
  onChange: value => action('onChange')(value),
  placeholder: 'Type the price in R$',
  disabled: false,
  label: 'Price',
};
