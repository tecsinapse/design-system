import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: (name: string) => '#353231',
}));

jest.mock('../../atoms/Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: (props: { name: string }) => <Text>{props.name}</Text>,
  };
});

import InputPassword, { InputPasswordIcon } from './InputPassword';

describe('InputPassword', () => {
  it('masks the input by default', () => {
    const { getByPlaceholderText } = render(
      <InputPassword placeholder="senha" onChange={() => {}} />,
    );
    expect(getByPlaceholderText('senha').props.secureTextEntry).toBe(true);
  });

  it('reveals the password when the toggle icon is pressed', () => {
    const { getByPlaceholderText, getByText } = render(
      <InputPassword placeholder="senha" onChange={() => {}} />,
    );
    fireEvent.press(getByText('eye-off-outline'));
    expect(getByPlaceholderText('senha').props.secureTextEntry).toBe(false);
  });
});

describe('InputPasswordIcon', () => {
  it('toggles state on press', () => {
    const onChangeState = jest.fn();
    const { getByRole } = render(
      <InputPasswordIcon revealed={false} onChangeState={onChangeState} />,
    );
    fireEvent.press(getByRole('button'));
    expect(onChangeState).toHaveBeenCalledWith(true);
  });
});