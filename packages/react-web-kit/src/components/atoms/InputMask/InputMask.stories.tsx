import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import InputMask, { InputMaskWebProps } from './InputMask';
import { Masks } from '@tecsinapse/react-core/src';
import { CurrencyOptions } from '@tecsinapse/react-core/dist/components/atoms/Input';

export default {
  title: 'Hybrid/InputMask',
  component: InputMask,
};

const TemplateStringMask: Story<InputMaskWebProps> = args => {
  const [value, setValue] = useState<string>();

  const onChange = text => {
    setValue(text);
    if (args.onChange) {
      args.onChange(text);
    }
  };

  return (
    <InputMask
      {...args}
      label={args.label}
      value={value}
      onChange={onChange}
      placeholder={args.placeholder}
      mask={Masks.COMBINED_PHONE}
    />
  );
};

export const StringMask = TemplateStringMask.bind({});

StringMask.args = {
  onChange: value => action('onChange')(value),
  placeholder: 'Type your phone',
  disabled: false,
  label: 'Phone',
};

const TemplateNumberMask: Story<InputMaskWebProps> = args => {
  const [value, setValue] = useState<number>(1200.2);

  const onChange = text => {
    setValue(text);
    if (args.onChange) {
      args.onChange(text);
    }
  };

  const numberMaskExample: CurrencyOptions = {
    symbol: 'R$ ',
    separator: '.',
    decimal: ',',
    precision: 2,
  };

  return (
    <InputMask
      {...args}
      label={args.label}
      value={value}
      onChange={onChange}
      placeholder={args.placeholder}
      mask={numberMaskExample}
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
