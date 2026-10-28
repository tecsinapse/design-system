import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('../Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: (props: { name: string }) => <Text>{props.name}</Text>,
  };
});

import RadioButton from './RadioButton';

describe('RadioButton', () => {
  it('toggles onChange with the inverted checked state', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<RadioButton onChange={onChange} />);
    fireEvent.press(getByRole('radio'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
  it('does not toggle when disabled', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<RadioButton onChange={onChange} disabled />);
    fireEvent.press(getByRole('radio'));
    expect(onChange).not.toHaveBeenCalled();
  });
  it('renders the bordered surface circle', () => {
    const { root } = render(<RadioButton />);
    const node = root.findAll((n) => !!n.props?.className?.includes('border-primary-medium'))[0];
    const className = node.props.className as string;
    expect(className).toContain('rounded-pill');
    expect(className).toContain('bg-surface-overlay');
  });
});
