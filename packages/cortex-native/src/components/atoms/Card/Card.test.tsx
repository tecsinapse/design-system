import React from 'react';
import { ViewStyle } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#ffffff',
}));

import Card from './Card';
import Text from '../Text/Text';

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
  it('applies the theme surface background on a pressable card (not transparent)', () => {
    const { getByTestId } = render(
      <Card onPress={() => {}} testID="card">
        content
      </Card>,
    );
    // Pressable's `style` is a state-callback array: [composedStyle, pressed-state style].
    // composedStyle = [bgColorStyle, consumerStyle]; so the resolved background color
    // lives at style[0][0].backgroundColor.
    const style = getByTestId('card').props.style as Array<Array<ViewStyle>>;
    expect(style[0][0].backgroundColor).not.toBe('transparent');
    expect(style[0][0].backgroundColor).toBe('#ffffff');
  });
});

describe('Card compound', () => {
  it('exposes its parts as statics with Root aliasing the callable', () => {
    expect(Card.Root).toBe(Card);
    expect(Card.Header).toBeDefined();
    expect(Card.Body).toBeDefined();
    expect(Card.Footer).toBeDefined();
  });

  it('renders composed parts', () => {
    const { getByText } = render(
      <Card>
        <Card.Header>
          <Text>head</Text>
        </Card.Header>
        <Card.Body>
          <Text>body</Text>
        </Card.Body>
        <Card.Footer>
          <Text>foot</Text>
        </Card.Footer>
      </Card>
    );
    expect(getByText('head')).toBeTruthy();
    expect(getByText('body')).toBeTruthy();
    expect(getByText('foot')).toBeTruthy();
  });

  it('merges the consumer className over the base surface on both branches', () => {
    const passive = render(<Card testID="p" className="bg-red-500" />);
    const passiveClass = passive.getByTestId('p').props.className as string;
    expect(passiveClass).toContain('bg-red-500');
    expect(passiveClass).not.toContain('bg-surface-overlay');

    const active = render(
      <Card testID="a" className="bg-red-500" onPress={() => undefined} />
    );
    const activeClass = active.getByTestId('a').props.className as string;
    expect(activeClass).toContain('bg-red-500');
    expect(activeClass).not.toContain('bg-surface-overlay');
  });

  it('forwards rest props on the non-pressable branch', () => {
    const { getByTestId } = render(<Card testID="c" accessibilityLabel="card" />);
    expect(getByTestId('c').props.accessibilityLabel).toBe('card');
  });
});
