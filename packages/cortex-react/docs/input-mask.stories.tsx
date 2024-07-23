import { StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { Input } from '../src';
import { Masks } from './utils';

export default {
  title: 'Cortex/Input/Mask',
  component: Input,
  args: {
    mask: [Masks.PHONE, Masks.PHONE_EXTENDED]
  },
  argTypes: {
    mask: {
      control: { type: 'array' },
    },
  },
};

const Template: StoryFn = args => {
  const [expressionValue, setExpressionValue] = useState('1112345678')  
  const [numberValue, setNumberValue] = useState('1000')  
  const [currencyValue, setCurrencyValue] = useState('99,50')  

  return (
    <div className={'flex flex-col gap-y-mili'}>
      <Input.MaskExpression
        placeholder={args.placeholder} 
        label={'Expression Mask'}
        onChange={(e) => setExpressionValue(e.target?.value)}
        defaultValue={expressionValue}
        mask={args.mask}
      />
      <Input.MaskNumber
        placeholder={args.placeholder} 
        label={'Number Mask'}
        onChange={(e) => setNumberValue(e.target?.value)}
        defaultValue={numberValue}
      />
      <Input.MaskCurrency
        placeholder={args.placeholder} 
        label={'Currency Mask'}
        onChange={(e) => setCurrencyValue(e.target?.value)}
        defaultValue={currencyValue}
      />
    </div>
  );
};

export const Base = {
  render: Template,
  args: {},
};
