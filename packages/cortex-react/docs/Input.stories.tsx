import { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
import { IoEye, IoPerson } from 'react-icons/io5';
import { Hint, Input } from '../src';
import { Masks } from './utils';

export default {
  title: 'Cortex/Input',
  component: Input.Root,
  subcomponents: {
    Search: Input.Search,
    MaskExpression: Input.MaskExpression,
    MaskCurrency: Input.MaskCurrency,
    MaskNumber: Input.MaskNumber,
  },
} as Meta<typeof Input.Root>;

const baseArgs = {
  label: 'Label',
  placeholder: 'Placeholder',
  variants: {
    intent: 'default',
  },
};

export const Default: StoryObj<typeof Input.Root> = {
  args: {
    ...baseArgs,
  },
  render: args => (
    <>
      <Input.Root
        label={args.label}
        placeholder={args.placeholder}
        variants={args.variants}
        {...args}
      />
    </>
  ),
};

export const Custom: StoryObj<typeof Input.Face & typeof Input.Box> = {
  args: {
    ...baseArgs,
  },
  render: args => (
    <Input.Face>
      <Input.Left>
        <IoPerson size={16} />
      </Input.Left>
      <Input.Box label={args.label} placeholder={args.placeholder}></Input.Box>
      <Input.Right>
        <IoEye />
      </Input.Right>
    </Input.Face>
  ),
};

export const Search: StoryObj<typeof Input.Search> = {
  args: {
    bounceTimeout: 2000,
    ...baseArgs,
  },
  render: args => {
    const [value, setValue] = useState('');

    return (
      <Input.Search
        placeholder={'Placeholder'}
        label={args.label}
        onChange={e => setValue(e.target?.value)}
        defaultValue={value}
      />
    );
  },
};

export const ExpressionMask: StoryObj<typeof Input.MaskExpression> = {
  args: {
    mask: [Masks.PHONE, Masks.PHONE_EXTENDED],
    ...baseArgs,
    label: 'Expression Mask',
  },
  render: args => {
    const [expressionValue, setExpressionValue] = useState('1112345678');

    return (
      <Input.MaskExpression
        placeholder={args.placeholder}
        label={args.label}
        onChange={e => setExpressionValue(e.target?.value)}
        defaultValue={expressionValue}
        mask={args.mask}
      />
    );
  },
};

export const NumberMask: StoryObj<typeof Input.MaskNumber> = {
  args: {
    ...baseArgs,
    label: 'Number Mask',
  },
  render: args => {
    const [numberValue, setNumberValue] = useState('1000');

    return (
      <Input.MaskNumber
        placeholder={args.placeholder}
        label={args.label}
        onChange={e => setNumberValue(e.target?.value)}
        defaultValue={numberValue}
      />
    );
  },
};

export const CurrencyMask: StoryObj<typeof Input.MaskCurrency> = {
  args: {
    ...baseArgs,
    label: 'Currency Mask',
  },
  render: args => {
    const [currencyValue, setCurrencyValue] = useState('99,50');

    return (
      <Input.MaskCurrency
        placeholder={args.placeholder}
        label={args.label}
        onChange={e => setCurrencyValue(e.target?.value)}
        defaultValue={currencyValue}
      />
    );
  },
};

export const ShowUnmasked: StoryObj<typeof Input.MaskExpression> = {
  args: {
    mask: [Masks.PHONE, Masks.PHONE_EXTENDED],
    ...baseArgs,
    label: 'Expression Mask',
  },
  render: args => {
    const [expressionValue, setExpressionValue] = useState('1112345678');
    const unmaskedRef = useRef('1112345678');

    return (
      <>
        <Input.MaskExpression
          placeholder={args.placeholder}
          label={args.label}
          onChange={e => setExpressionValue(e.target?.value)}
          defaultValue={expressionValue}
          mask={args.mask}
          unmaskedRef={unmaskedRef}
        />
        <Hint>Unmasked: {unmaskedRef.current}</Hint>
      </>
    );
  },
};
