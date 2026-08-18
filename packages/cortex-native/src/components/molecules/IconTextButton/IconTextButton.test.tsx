import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('../../atoms/Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: (props: { name: string; size?: string }) => (
      <Text testID="mock-icon" size={props.size}>
        {props.name}
      </Text>
    ),
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

  it('honors an explicit iconProps.size over the small/centi default', () => {
    const { getByTestId } = render(
      <IconTextButton
        label="Save"
        size="small"
        iconProps={{ name: 'check', type: 'ionicon', size: 'kilo' }}
      />,
    );
    expect(getByTestId('mock-icon').props.size).toBe('kilo');
  });

  it('uses centi as the default icon size for a default button', () => {
    const { getByTestId } = render(
      <IconTextButton
        label="Save"
        iconProps={{ name: 'check', type: 'ionicon' }}
      />,
    );
    expect(getByTestId('mock-icon').props.size).toBe('centi');
  });

  it('uses mili as the icon size for a small button', () => {
    const { getByTestId } = render(
      <IconTextButton
        label="Save"
        size="small"
        iconProps={{ name: 'check', type: 'ionicon' }}
      />,
    );
    expect(getByTestId('mock-icon').props.size).toBe('mili');
  });
});