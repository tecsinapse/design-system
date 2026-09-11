import React from 'react';
import { render } from '@testing-library/react-native';
import Divider from './Divider';

describe('Divider', () => {
  it('renders a top line by default', () => {
    const { getByTestId } = render(<Divider testID="d" />);
    const className = getByTestId('d').props.className as string;
    expect(className).toContain('border-secondary-xlight');
    expect(className).toContain('border-t');
    expect(className).not.toContain('border-b');
  });
  it('renders a bottom line when requested', () => {
    const { getByTestId } = render(<Divider testID="d" linePosition="bottom" />);
    const className = getByTestId('d').props.className as string;
    expect(className).toContain('border-b');
    expect(className).not.toContain('border-t');
  });
  it('omits the line entirely when noLine is set', () => {
    const { getByTestId } = render(<Divider testID="d" noLine />);
    const className = getByTestId('d').props.className as string;
    expect(className).not.toContain('border-t');
    expect(className).not.toContain('border-b');
  });
});
