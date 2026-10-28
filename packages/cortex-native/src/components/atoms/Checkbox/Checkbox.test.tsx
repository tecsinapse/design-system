import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('../Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: (props: { name: string }) => <Text>{props.name}</Text>,
  };
});

import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('toggles onChange with the inverted checked state', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Checkbox onChange={onChange} />);
    fireEvent.press(getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
  it('does not toggle when disabled', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Checkbox onChange={onChange} disabled />);
    fireEvent.press(getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });
  it('renders the filled box with the token bg when checked', () => {
    const { root } = render(<Checkbox checked color="success" />);
    const node = root.findAll((n) => !!n.props?.className?.includes('bg-success-medium'))[0];
    const className = node.props.className as string;
    expect(className).toContain('bg-success-medium');
  });
  it('renders the surface background box when unchecked', () => {
    const { root } = render(<Checkbox />);
    const node = root.findAll((n) => !!n.props?.className?.includes('bg-surface-overlay'))[0];
    const className = node.props.className as string;
    expect(className).toContain('bg-surface-overlay');
  });
});
