import React from 'react';
import { render } from '@testing-library/react-native';
import Paper from './Paper';

describe('Paper', () => {
  it('applies the surface background and base radius', () => {
    const { getByTestId } = render(<Paper testID="p" />);
    const className = getByTestId('p').props.className as string;
    expect(className).toContain('bg-surface-overlay');
    expect(className).toContain('rounded-mili');
  });
  it('adds the shadow token when elevated', () => {
    const { getByTestId } = render(<Paper testID="p" elevated />);
    const className = getByTestId('p').props.className as string;
    expect(className).toContain('shadow-default');
  });
  it('omits the shadow token when not elevated', () => {
    const { getByTestId } = render(<Paper testID="p" />);
    const className = getByTestId('p').props.className as string;
    expect(className).not.toContain('shadow-default');
  });
});
