import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#ffffff',
}));

import Card from './Card';

describe('Card', () => {
  it('renders the surface container with base classes', () => {
    const { root } = render(<Card>content</Card>);
    const node = root.findAll((n) => n.props?.className?.includes('bg-surface-overlay'))[0];
    const className = node.props.className as string;
    expect(className).toContain('rounded-mili');
    expect(className).not.toContain('shadow-default');
  });
  it('adds the shadow token when elevated', () => {
    const { root } = render(<Card elevated>content</Card>);
    const node = root.findAll((n) => n.props?.className?.includes('bg-surface-overlay'))[0];
    expect(node.props.className).toContain('shadow-default');
  });
  it('renders a pressable card when onPress is provided', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Card onPress={onPress} testID="card">
        content
      </Card>,
    );
    fireEvent.press(getByTestId('card'));
    expect(onPress).toHaveBeenCalled();
  });
});
