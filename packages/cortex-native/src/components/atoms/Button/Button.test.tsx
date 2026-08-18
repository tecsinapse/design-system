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
  it('composes filled primary classes with readable on-primary text', () => {
    const { getByRole } = render(<Button title="ok" intent="primary" variant="filled" />);
    const className = getByRole('button').props.className as string;
    expect(className).toContain('bg-primary-medium');
    expect(className).toContain('text-on-primary');
  });
  it('uses on-primary text for filled success (no same-on-same)', () => {
    const { getByRole } = render(<Button title="ok" intent="success" variant="filled" />);
    const className = getByRole('button').props.className as string;
    expect(className).toContain('bg-success-medium');
    expect(className).toContain('text-on-primary');
    expect(className).not.toContain('text-success-medium');
  });
  it('uses intent text color for outline variant', () => {
    const { getByRole } = render(<Button title="ok" intent="success" variant="outline" />);
    const className = getByRole('button').props.className as string;
    expect(className).toContain('bg-transparent');
    expect(className).toContain('text-success-medium');
    expect(className).not.toContain('text-on-primary');
  });
});
