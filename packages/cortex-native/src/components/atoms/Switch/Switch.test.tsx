import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import type { ReactTestRendererJSON } from 'react-test-renderer';
import { lightenDarkenColor } from '../../../utils/lightenDarkenColor';

jest.mock('uniwind', () => ({
  useCSSVariable: (name: string) =>
    name === '--color-secondary-light' ? '#c2bfbc' : '#f89907',
}));

import Switch from './Switch';

const INACTIVE = '#c2bfbc';
const ACTIVE = '#f89907';
const LIGHTENED_INACTIVE = lightenDarkenColor(INACTIVE, 20);
const LIGHTENED_ACTIVE = lightenDarkenColor(ACTIVE, 20);

const rgba = (hex: string) =>
  `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(
    hex.slice(5, 7),
    16,
  )}, 1)`;

const bodyBackground = (
  tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null,
): string => {
  const walk = (n: ReactTestRendererJSON | null): string | null => {
    if (!n) return null;
    const style = n.props?.style;
    if (style?.width === 40) return style.backgroundColor ?? null;
    for (const c of n.children ?? []) {
      if (typeof c === 'object') {
        const r = walk(c);
        if (r) return r;
      }
    }
    return null;
  };
  if (Array.isArray(tree)) {
    for (const n of tree) {
      const r = walk(n);
      if (r) return r;
    }
    return '';
  }
  return walk(tree) ?? '';
};

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
  it('renders the lightened inactive tone when disabled and active', () => {
    const { toJSON } = render(<Switch onChange={() => {}} active disabled />);
    expect(bodyBackground(toJSON())).toBe(rgba(LIGHTENED_INACTIVE));
  });
  it('does not lighten the active tone when disabled and active', () => {
    const { toJSON } = render(<Switch onChange={() => {}} active disabled />);
    expect(bodyBackground(toJSON())).not.toBe(rgba(LIGHTENED_ACTIVE));
  });
});
