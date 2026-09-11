import React from 'react';
import { render } from '@testing-library/react-native';
import Badge from './Badge';

const badgeClass = (root: ReturnType<typeof render>['root']) => {
  const node = root.findAll((n) => !!n.props?.className?.includes('bg-'))[0];
  return node.props.className as string;
};

describe('Badge', () => {
  it('applies the default primary/medium tone class', () => {
    const { root } = render(<Badge value="9">content</Badge>);
    const className = badgeClass(root);
    expect(className).toContain('bg-primary-medium');
  });
  it('maps color+tone to the token bg class', () => {
    const { root } = render(
      <Badge value="9" color="success" tone="dark">
        content
      </Badge>,
    );
    const className = badgeClass(root);
    expect(className).toContain('bg-success-dark');
  });
  it('positions the badge absolutely at the top-right', () => {
    const { root } = render(<Badge value="9">content</Badge>);
    const className = badgeClass(root);
    expect(className).toContain('absolute');
    expect(className).toContain('rounded-pill');
  });
});
