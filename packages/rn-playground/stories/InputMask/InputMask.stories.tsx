import { InputMask, Masks } from '@tecsinapse/cortex-native';
import React, { useState } from 'react';
import { Meta } from '@storybook/react-vite';

const StoryMeta: Meta<typeof InputMask> = {
  title: 'InputMask',
  component: InputMask,
};

export default StoryMeta;

export const Phone = () => {
  const [value, onChange] = useState<string>('(11)99999-9999');
  return (
    <InputMask
      label={'Phone'}
      value={value}
      onChange={onChange as (value: string | number) => void}
      placeholder={'Type your phone'}
      mask={Masks.COMBINED_PHONE}
    />
  );
};

export const Cpf = () => {
  const [value, onChange] = useState<string>('012.345.678-90');
  return (
    <InputMask
      label={'CPF'}
      value={value}
      onChange={onChange as (value: string | number) => void}
      placeholder={'Type your CPF'}
      mask={Masks.CPF}
    />
  );
};
