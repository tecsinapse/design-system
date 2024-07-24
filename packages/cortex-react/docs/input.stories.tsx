import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { IoEye, IoPerson } from 'react-icons/io5';
import { Input } from '../src';

const Face = Input.Face
const Right = Input.Right
const Left = Input.Left
const Box = Input.Box

export default {
  title: 'Cortex/Input',
  component:  Input.Root,
  subcomponents: { 
    'Search': Input.Search,
    'MaskExpression': Input.MaskExpression, 
    'MaskCurrency': Input.MaskCurrency, 
    'MaskNumber': Input.MaskNumber,
  },
  parameters: {
  }
} as Meta<typeof Input.Root>

export const Root: StoryFn<typeof Input.Root> = (args) => {
  return <Input.Root label={args.label} placeholder='Placeholder' {...args}/>
};

export const Custom: StoryFn<typeof Input.Face & typeof Input.Box> = (args) => {
  return (
    <Input.Face >
      <Input.Left>
        <IoPerson size={16} />
      </Input.Left>
      <Input.Box label={args.label} placeholder={args.placeholder}></Input.Box>
      <Input.Right>
        <IoEye />
      </Input.Right>
    </Input.Face>
  ) 
};

export const Search: StoryFn<typeof Input.Search> = (args) => {
  const [value, setValue] = useState('')  

  return (
      <Input.Search 
        placeholder={args.placeholder} 
        label={args.label}
        onChange={(e) => setValue(e.target?.value)}
        defaultValue={value}
      />
  );
}

export const ExpressionMask: StoryFn<typeof Input.MaskExpression> =  (args) => {
  const [expressionValue, setExpressionValue] = useState('1112345678')  

  return (
      <Input.MaskExpression
        placeholder={args.placeholder} 
        label={'Expression Mask'}
        onChange={(e) => setExpressionValue(e.target?.value)}
        defaultValue={expressionValue}
        mask={args.mask}
      />
  );
};

export const NumberMask: StoryFn<typeof Input.MaskNumber> =  (args) => {
  const [numberValue, setNumberValue] = useState('1000')   
  
  return (
    <Input.MaskNumber
      placeholder={args.placeholder} 
      label={'Number Mask'}
      onChange={(e) => setNumberValue(e.target?.value)}
      defaultValue={numberValue}
    />
  );
};

export const CurrencyMask: StoryFn<typeof Input.MaskCurrency> =  (args) =>{
  const [currencyValue, setCurrencyValue] = useState('99,50')     

  return (
    <Input.MaskCurrency
      placeholder={args.placeholder} 
      label={'Currency Mask'}
      onChange={(e) => setCurrencyValue(e.target?.value)}
      defaultValue={currencyValue}
    />
  );
};