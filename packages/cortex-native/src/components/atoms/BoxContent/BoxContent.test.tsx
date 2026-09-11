import React from 'react';
import { render } from '@testing-library/react-native';
import BoxContent from './BoxContent';

describe('BoxContent', () => {
  it.each([
    ['top', 'rounded-b-deca'],
    ['bottom', 'rounded-t-deca'],
    ['left', 'rounded-r-deca'],
    ['right', 'rounded-l-deca'],
  ] as const)('rounds the %s-facing corners', (variant, expected) => {
    const { getByTestId } = render(<BoxContent testID="b" variant={variant} />);
    const className = getByTestId('b').props.className as string;
    expect(className).toContain(expected);
  });
  it('applies the surface background and shadow tokens', () => {
    const { getByTestId } = render(<BoxContent testID="b" variant="top" />);
    const className = getByTestId('b').props.className as string;
    expect(className).toContain('bg-surface-overlay');
    expect(className).toContain('shadow-default');
    expect(className).toContain('overflow-hidden');
  });
});
