import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#353231',
}));

jest.mock('../../atoms/Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: (props: { name: string }) => <Text>{props.name}</Text>,
  };
});

import InputMask from './InputMask';
import { Masks } from '@tecsinapse/cortex-core';

describe('InputMask', () => {
  it('formats a CPF string as the user types', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <InputMask
        placeholder="cpf"
        mask={Masks.CPF}
        value=""
        onChange={onChange}
      />,
    );
    fireEvent.changeText(getByPlaceholderText('cpf'), '12345678909');
    expect(getByPlaceholderText('cpf').props.value).toBe('123.456.789-09');
  });

  it('formats a currency number mask', () => {
    const { getByPlaceholderText } = render(
      <InputMask
        placeholder="amount"
        mask={{ symbol: 'R$ ', separator: '.', decimal: ',', precision: 2 }}
        value=""
        onChange={() => {}}
      />,
    );
    fireEvent.changeText(getByPlaceholderText('amount'), '123456');
    expect(getByPlaceholderText('amount').props.value).toBe('R$ 1.234,56');
  });

  it('renders the hint when provided', () => {
    const { getByText } = render(
      <InputMask
        placeholder="x"
        mask={Masks.CEP}
        value=""
        onChange={() => {}}
        hint="hint"
      />,
    );
    expect(getByText('hint')).toBeTruthy();
  });
});