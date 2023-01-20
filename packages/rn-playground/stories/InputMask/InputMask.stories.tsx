import { InputMask, Masks } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof InputMask> = {
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
      onChange={onChange}
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
      onChange={onChange}
      placeholder={'Type your CPF'}
      mask={Masks.CPF}
    />
  );
};
