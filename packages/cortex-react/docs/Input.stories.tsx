import { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import { IoEye, IoPerson } from 'react-icons/io5';
import {
  CurrencyIMask,
  ExpressionMasks,
  Hint,
  Input,
  InputMaskEvent,
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
        value={expressionValue}
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
        onChange={e => setNumberValue(e.unmaskedValue)}
        value={numberValue}
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
        onChange={e => setCurrencyValue(e.unmaskedValue)}
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
    mask: PercentageIMask,
  },
  render: args => {
    const [percentageValue, setPercentageValue] = useState('99,5');

    return (
      <Input.Mask
        placeholder={args.placeholder}
        label={args.label}
        onChange={e => setPercentageValue(e.unmaskedValue)}
        value={percentageValue}
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
    const [unmaskedNumberValue, setUnmaskedNumberValue] = useState('90,54');

    return (
      <div className="flex flex-col gap-y-micro">
        <Input.Mask
          placeholder={args.placeholder}
          label={args.label}
          onChange={e => {
            setUnmaskedValue(e.unmaskedValue);
          }}
          value={unmaskedValue}
          mask={args.mask}
        />
        <Hint>Unmasked: {unmaskedValue}</Hint>

        <Input.Mask
          label={'Number mask'}
          onChange={e => {
            setUnmaskedNumberValue(e.unmaskedValue);
          }}
          value={unmaskedNumberValue}
          mask={CurrencyIMask}
        />
        <Hint>Unmasked: {unmaskedNumberValue}</Hint>
      </div>
    );
  },
};

const total = 100;

export const DoubleMask: StoryObj<typeof Input.Mask> = {
  args: {
    ...baseArgs,
    label: 'Expression Mask',
  },
  render: args => {
    const [currency, setCurrency] = useState(String(total));
    const [percentage, setPercentage] = useState(String(total));

    const handleChangeCurrency = useCallback(
      (e: InputMaskEvent) => {
        const rawNumber = Number(e.unmaskedValue ?? 0);
        setCurrency(e.unmaskedValue);
        if (rawNumber === 0) {
          setPercentage('0');
        } else {
          const update = (rawNumber * 100) / total;
          setPercentage(String(update));
        }
      },
      [currency]
    );

    const handleChangePercentage = useCallback(
      (e: InputMaskEvent) => {
        const rawNumber = Number(e.unmaskedValue ?? 0);
        setPercentage(e.unmaskedValue);
        if (rawNumber === 0) {
          setCurrency('0');
        } else {
          const update = (rawNumber / 100) * total;
          setCurrency(String(update));
        }
      },
      [percentage]
    );

    return (
      <>
        <Input.Mask
          placeholder={'currency'}
          label={'currency'}
          onChange={handleChangeCurrency}
          value={currency}
          mask={CurrencyIMask}
        />
        <Input.Mask
          placeholder={'percentage'}
          label={'percentage'}
          onChange={handleChangePercentage}
          value={percentage}
          mask={PercentageIMask}
        />
      </>
    );
  },
};
