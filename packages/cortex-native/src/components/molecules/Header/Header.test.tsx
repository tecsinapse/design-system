import React from 'react';
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#ffffff',
}));

import Header from './Header';
import { FloatingButton, DummyButton } from './FloatingButton';
import Text from '../../atoms/Text/Text';

describe('Header compound', () => {
  it('exposes parts with Root aliasing the callable', () => {
    expect(Header.Root).toBe(Header);
    ['Left', 'Title', 'Right'].forEach(p => expect(Header[p as 'Left']).toBeDefined());
  });

  it('renders composed slots', () => {
    const { getByText } = render(
      <Header>
        <Header.Left>
          <Text>L</Text>
        </Header.Left>
        <Header.Title>
          <Text>T</Text>
        </Header.Title>
        <Header.Right>
          <Text>R</Text>
        </Header.Right>
      </Header>,
    );
    ['L', 'T', 'R'].forEach(t => expect(getByText(t)).toBeTruthy());
  });

  it('merges the consumer className instead of discarding it', () => {
    const { getByTestId } = render(<Header testID="h" className="px-nano" />);
    expect(getByTestId('h').props.className as string).toContain('px-nano');
  });

  it('still renders legacy leftButton/rightButton with their badges', () => {
    const { getByText } = render(
      <Header
        leftButton={{ icon: { name: 'menu', type: 'ionicon' }, valueBadge: 3 }}
        rightButton={{ icon: { name: 'close', type: 'ionicon' } }}
      >
        <Text>title</Text>
      </Header>,
    );
    expect(getByText('3')).toBeTruthy();
    expect(getByText('title')).toBeTruthy();
  });
});

describe('Header FloatingButton layout classes', () => {
  it('expresses the fixed size as classes, not inline style, on FloatingButton', () => {
    const { toJSON } = render(<FloatingButton icon={{ name: 'menu', type: 'ionicon' }} />);
    const pressable = toJSON() as { props: { className?: string; style?: unknown } };
    expect(pressable.props.className as string).toContain('aspect-square');
    expect(pressable.props.className as string).toContain('h-[49px]');
    const resolved = StyleSheet.flatten(pressable.props.style) ?? {};
    expect(resolved.aspectRatio).toBeUndefined();
    expect(resolved.height).toBeUndefined();
  });

  it('expresses the fixed size as classes, not inline style, on DummyButton', () => {
    const { toJSON } = render(<DummyButton />);
    const pressable = toJSON() as { props: { className?: string; style?: unknown } };
    expect(pressable.props.className as string).toContain('aspect-square');
    expect(pressable.props.className as string).toContain('h-[49px]');
    const resolved = StyleSheet.flatten(pressable.props.style) ?? {};
    expect(resolved.aspectRatio).toBeUndefined();
    expect(resolved.height).toBeUndefined();
  });
});
