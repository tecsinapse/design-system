import { PhoneCountrySearchInputProps } from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { Input } from '../../atoms/Input';

export const SearchInput: FC<PhoneCountrySearchInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
}) => (
  <Input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
  />
);
