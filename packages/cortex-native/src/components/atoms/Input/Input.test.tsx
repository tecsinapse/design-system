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
import Text from '../Text/Text';

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

describe('Input compound', () => {
  it('exposes its parts with Root aliasing the callable', () => {
    expect(Input.Root).toBe(Input);
    ['Face', 'Box', 'Label', 'Hint', 'Left', 'Right'].forEach(part => {
      expect(Input[part as 'Face']).toBeDefined();
    });
  });

  it('renders a composed input', () => {
    const { getByTestId, getByText } = render(
      <Input.Face testID="face">
        <Input.Left>
          <Text>R$</Text>
        </Input.Left>
        <Input.Box testID="box" value="10" />
        <Input.Right>
          <Text>kg</Text>
        </Input.Right>
      </Input.Face>
    );
    expect(getByTestId('face')).toBeTruthy();
    expect(getByTestId('box').props.value).toBe('10');
    expect(getByText('R$')).toBeTruthy();
    expect(getByText('kg')).toBeTruthy();
  });

  it('throws when a part is used outside a root that provides context', () => {
    expect(() => render(<Input.Label>label</Input.Label>)).toThrow(
      /must be used within/
    );
  });

  it('keeps the monolith API working', () => {
    const { getByText, getByDisplayValue } = render(
      <Input label="Name" hint="required" value="Ada" />
    );
    expect(getByDisplayValue('Ada')).toBeTruthy();
    expect(getByText('required')).toBeTruthy();
  });

  it('still honours the legacy leftComponent/rightComponent injection', () => {
    const { getByText } = render(
      <Input
        value="x"
        leftComponent={<Text>left-legacy</Text>}
        rightComponent={<Text>right-legacy</Text>}
      />
    );
    expect(getByText('left-legacy')).toBeTruthy();
    expect(getByText('right-legacy')).toBeTruthy();
  });
});
