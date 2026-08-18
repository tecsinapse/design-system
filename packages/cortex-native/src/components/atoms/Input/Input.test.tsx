import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: (name: string) =>
    name === '--color-content-high' ? '#353231' : '#f89907',
}));

jest.mock('../Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: (props: { name: string }) => <Text>{props.name}</Text>,
  };
});

import Input from './Input';

describe('Input', () => {
  it('renders a TextInput and forwards the value', () => {
    const { getByDisplayValue } = render(
      <Input value="hello" onChange={() => {}} />,
    );
    expect(getByDisplayValue('hello')).toBeTruthy();
  });

  it('calls onChange with the typed text', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="type here" onChange={onChange} />,
    );
    fireEvent.changeText(getByPlaceholderText('type here'), 'abc');
    expect(onChange).toHaveBeenCalledWith('abc');
  });

  it('renders the label only when there is a value', () => {
    const { queryByText, rerender } = render(
      <Input label="Name" value="" placeholder="Name" onChange={() => {}} />,
    );
    expect(queryByText('Name')).toBeNull();
    rerender(
      <Input label="Name" value="John" placeholder="Name" onChange={() => {}} />,
    );
    expect(queryByText('John')).toBeNull();
    expect(queryByText('Name')).toBeTruthy();
  });

  it('renders the hint when provided', () => {
    const { getByText } = render(
      <Input hint="required field" variant="error" onChange={() => {}} />,
    );
    expect(getByText('required field')).toBeTruthy();
  });

  it('is not editable when disabled', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="p" disabled onChange={() => {}} />,
    );
    expect(getByPlaceholderText('p').props.editable).toBe(false);
  });
});