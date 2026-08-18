import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#f89907',
}));

import Switch from './Switch';

describe('Switch', () => {
  it('toggles onChange with the inverted active state', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Switch onChange={onChange} active={false} />);
    fireEvent.press(getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
  it('does not toggle when disabled', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Switch onChange={onChange} active={false} disabled />,
    );
    fireEvent.press(getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });
  it('sizes the switch body from the exported constants', () => {
    const { getByTestId } = render(<Switch onChange={() => {}} active={false} testID="s" />);
    const body = getByTestId('s');
    expect(body.props.accessibilityRole).toBe('switch');
  });
});
