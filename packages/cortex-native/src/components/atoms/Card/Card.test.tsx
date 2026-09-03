import React from 'react';
import { StyleSheet } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#ffffff',
}));

import Card from './Card';
import Text from '../Text/Text';

type MeasureCallback = (
  left: number,
  top: number,
  width: number,
  height: number,
  pageX: number,
  pageY: number,
) => void;

// Pressable resolves `style({ pressed })` internally before it reaches the
// rendered host node, so reading `props.style` only ever observes the
// resting (unpressed) value. Simulating the native responder grant is the
// only way to observe the pressed-state style RNTL renders.
function simulatePressIn(element: ReactTestInstance): void {
  const target = { measure: (cb: MeasureCallback) => cb(0, 0, 100, 100, 5, 5) };
  fireEvent(element, 'responderGrant', {
    persist: () => {},
    nativeEvent: { touches: [{ pageX: 5, pageY: 5 }], changedTouches: [{ pageX: 5, pageY: 5 }] },
    currentTarget: target,
    target,
    timeStamp: Date.now(),
  });
}

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
  it('paints via className with no inline backgroundColor on the pressable branch', () => {
    const { getByTestId } = render(
      <Card testID="card" className="bg-red-500" onPress={() => {}}>
        content
      </Card>,
    );
    const root = getByTestId('card');
    expect(root.props.className as string).toContain('bg-red-500');
    const style = root.props.style;
    const resolved = typeof style === 'function' ? style({ pressed: false }) : style;
    expect((StyleSheet.flatten(resolved) ?? {}).backgroundColor).toBeUndefined();
  });
  it('still darkens on press', () => {
    const { getByTestId } = render(
      <Card testID="card" onPress={() => {}}>
        content
      </Card>,
    );
    const card = getByTestId('card');
    simulatePressIn(card);
    const pressed = getByTestId('card').props.style;
    const resolved = typeof pressed === 'function' ? pressed({ pressed: true }) : pressed;
    expect((StyleSheet.flatten(resolved) ?? {}).backgroundColor).toBeDefined();
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
