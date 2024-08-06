import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { IoEye, IoPerson } from 'react-icons/io5';
import {
  CurrencyIMask,
  ExpressionMasks,
  Hint,
  Input,
  NumberIMask,
  PercentageIMask,
} from '../src';

export default {
  title: 'Cortex/Input',
  component: Input.Root,
  subcomponents: {
    Search: Input.Search,
    Mask: Input.Mask,
    Face: Input.Face,
    Box: Input.Box,
    Left: Input.Left,
    Right: Input.Right,
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

export const ExpressionMask: StoryObj<typeof Input.Mask> = {
  args: {
    ...baseArgs,
    mask: { mask: [ExpressionMasks.PHONE, ExpressionMasks.PHONE_EXTENDED] },
    label: 'Expression Mask',
  },
  render: args => {
    const [expressionValue, setExpressionValue] = useState('1112345678');

    return (
      <Input.Mask
        placeholder={args.placeholder}
        label={args.label}
        onChange={e => setExpressionValue(e.value)}
        defaultValue={expressionValue}
        mask={args.mask}
      />
    );
  },
};

export const NumberMask: StoryObj<typeof Input.Mask> = {
  args: {
    ...baseArgs,
    mask: NumberIMask,
    label: 'Number Mask',
  },
  render: args => {
    const [numberValue, setNumberValue] = useState('1000');

    return (
      <Input.Mask
        placeholder={args.placeholder}
        label={args.label}
        onChange={e => setNumberValue(e.value)}
        defaultValue={numberValue}
        mask={args.mask}
      />
    );
  },
};

export const CurrencyMask: StoryObj<typeof Input.Mask> = {
  args: {
    ...baseArgs,
    label: 'Currency Mask',
    mask: CurrencyIMask,
  },
  render: args => {
    const [currencyValue, setCurrencyValue] = useState('99,50');

    return (
      <Input.Mask
        placeholder={args.placeholder}
        label={args.label}
        onChange={e => setCurrencyValue(e.value)}
        defaultValue={currencyValue}
        mask={args.mask}
      />
    );
  },
};

export const PercentageMask: StoryObj<typeof Input.Mask> = {
  args: {
    ...baseArgs,
    label: 'Percentage Mask',
    mask: PercentageIMask,
  },
  render: args => {
    const [currencyValue, setCurrencyValue] = useState('99,50');

    return (
      <Input.Mask
        placeholder={args.placeholder}
        label={args.label}
        onChange={e => setCurrencyValue(e.value)}
        defaultValue={currencyValue}
        mask={args.mask}
      />
    );
  },
};

export const ShowUnmasked: StoryObj<typeof Input.Mask> = {
  args: {
    ...baseArgs,
    mask: { mask: [ExpressionMasks.PHONE, ExpressionMasks.PHONE_EXTENDED] },
    label: 'Expression Mask',
  },
  render: args => {
    const [unmaskedValue, setUnmaskedValue] = useState('1112345678');

    return (
      <>
        <Input.Mask
          placeholder={args.placeholder}
          label={args.label}
          onChange={e => {
            console.log(e);
            setUnmaskedValue(e.unmaskedValue);
          }}
          defaultValue={unmaskedValue}
          mask={args.mask}
        />
        <Hint>Unmasked: {unmaskedValue}</Hint>
      </>
    );
  },
};
