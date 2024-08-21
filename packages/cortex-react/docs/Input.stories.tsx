import { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import { IoEye, IoPerson } from 'react-icons/io5';
import {
  BRLMask,
  Input,
  Masks,
  PercentageMask as PercentageMaskDef,
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
    mask: Masks.COMBINED_PHONE,
    label: 'Expression Mask',
  },
  render: args => {
    const [expressionValue, setExpressionValue] = useState('1112345678');

    return (
      <Input.Mask
        placeholder={args.placeholder}
        label={args.label}
        onChange={e => setExpressionValue(e.value)}
        value={expressionValue}
        mask={args.mask}
      />
    );
  },
};

export const NumberMask: StoryObj<typeof Input.Mask> = {
  args: {
    ...baseArgs,
    label: 'Number Mask',
  },
  render: args => {
    const [numberValue, setNumberValue] = useState(1000);

    return (
      <Input.Mask
        placeholder={args.placeholder}
        label={args.label}
        onChange={e => setNumberValue(e)}
        value={numberValue}
        type="number"
      />
    );
  },
};

export const CurrencyMask: StoryObj<typeof Input.Mask> = {
  args: {
    ...baseArgs,
    label: 'Currency Mask',
    mask: BRLMask,
  },
  render: args => {
    const [currencyValue, setCurrencyValue] = useState('99,50');

    return (
      <Input.Mask
        placeholder={args.placeholder}
        label={args.label}
        onChange={e => setCurrencyValue(e)}
        value={currencyValue}
        mask={args.mask}
      />
    );
  },
};

export const PercentageMask: StoryObj<typeof Input.Mask> = {
  args: {
    ...baseArgs,
    label: 'Percentage Mask',
    mask: PercentageMaskDef,
  },
  render: args => {
    const [percentageValue, setPercentageValue] = useState('99,5');

    return (
      <Input.Mask
        placeholder={args.placeholder}
        label={args.label}
        onChange={e => setPercentageValue(e)}
        value={percentageValue}
        mask={args.mask}
      />
    );
  },
};

export const DoubleMask: StoryObj<typeof Input.Mask> = {
  args: {
    ...baseArgs,
    label: 'Expression Mask',
  },
  render: args => {
    const total = 540;
    const [currency, setCurrency] = useState(0);
    const [percentage, setPercentage] = useState(0);

    const handleChangeCurrency = useCallback(
      (value: number) => {
        const rawNumber = value ?? 0;
        setCurrency(value);
        if (rawNumber === 0) {
          setPercentage(0);
        } else {
          const update = (rawNumber * 100) / total;
          setPercentage(update);
        }
      },
      [currency]
    );

    const handleChangePercentage = useCallback(
      (value: number) => {
        setPercentage(value);
        if (value === 0) {
          setCurrency(value);
        } else {
          const update = (value / 100) * total;
          setCurrency(update);
        }
      },
      [percentage]
    );

    return (
      <>
        <span>Total Amount: {total}</span>
        <Input.Mask
          placeholder={'currency'}
          label={'currency'}
          onChange={handleChangeCurrency}
          value={currency}
          mask={BRLMask}
        />
        <Input.Mask
          placeholder={'percentage'}
          label={'percentage'}
          onChange={handleChangePercentage}
          value={percentage}
          mask={PercentageMask}
        />
      </>
    );
  },
};
