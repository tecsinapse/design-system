import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Button', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title="ok" onPress={onPress} />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });
  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title="ok" onPress={onPress} disabled />);
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
  it('does not call onPress when loading', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title="ok" onPress={onPress} loading />);
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
