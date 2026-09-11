import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#ffffff',
}));

import Button from './components/atoms/Button/Button';
import Icon from './components/atoms/Icon/Icon';
import Switch from './components/atoms/Switch/Switch';
import Text from './components/atoms/Text/Text';

describe('props inherited from the RN primitive', () => {
  it('Button forwards PressableProps it never declared', () => {
    const { getByTestId } = render(
      <Button
        testID="b"
        title="t"
        accessibilityLabel="save"
        accessibilityHint="saves the form"
        hitSlop={8}
      />
    );
    const root = getByTestId('b');
    expect(root.props.accessibilityLabel).toBe('save');
    expect(root.props.accessibilityHint).toBe('saves the form');
  });

  it('Text forwards TextProps it never declared', () => {
    const { getByTestId } = render(
      <Text testID="t" selectable allowFontScaling={false}>
        t
      </Text>
    );
    expect(getByTestId('t').props.selectable).toBe(true);
    expect(getByTestId('t').props.allowFontScaling).toBe(false);
  });

  it('Icon forwards TextProps it never declared', () => {
    const { getByTestId } = render(
      <Icon testID="i" name="check" type="ionicon" accessibilityLabel="done" />
    );
    expect(getByTestId('i').props.accessibilityLabel).toBe('done');
  });

  it('Switch forwards ViewProps it never declared', () => {
    const { getByTestId } = render(
      <Switch testID="s" active onChange={() => undefined} accessibilityLabel="toggle" />
    );
    expect(getByTestId('s').props.accessibilityLabel).toBe('toggle');
  });
});
