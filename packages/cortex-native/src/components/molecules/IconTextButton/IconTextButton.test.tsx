import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('../../atoms/Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: (props: { name: string }) => <Text>{props.name}</Text>,
  };
});

import IconTextButton from './IconTextButton';

describe('IconTextButton', () => {
  it('renders label text', () => {
    const { getByText } = render(<IconTextButton label="Save" />);
    expect(getByText('Save')).toBeTruthy();
  });

  it('renders the icon at the left by default', () => {
    const { getByText } = render(
      <IconTextButton label="Save" iconProps={{ name: 'check', type: 'ionicon' }} />,
    );
    expect(getByText('check')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<IconTextButton label="Save" onPress={onPress} />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <IconTextButton label="Save" onPress={onPress} disabled />,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('applies filled button classes with the boxed padding when no label', () => {
    const { getByRole } = render(
      <IconTextButton iconProps={{ name: 'check', type: 'ionicon' }} />,
    );
    const className = getByRole('button').props.className as string;
    expect(className).toContain('bg-primary-medium');
    expect(className).toContain('aspect-square');
  });
});