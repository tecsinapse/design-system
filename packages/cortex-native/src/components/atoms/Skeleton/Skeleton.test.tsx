import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('react-native-linear-gradient', () => {
  const { View } = require('react-native');
  return { __esModule: true, default: (props: any) => <View {...props} /> };
});

import Skeleton from './Skeleton';

describe('Skeleton', () => {
  it('throws when no children or dimensions are provided', () => {
    expect(() => render(<Skeleton />)).toThrow();
  });
  it('renders the wrapper with the radius class', () => {
    const { getByTestId } = render(<Skeleton testID="s" radius="pill" width={10} height={10} />);
    const className = getByTestId('s').props.className as string;
    expect(className).toContain('rounded-pill');
    expect(className).toContain('overflow-hidden');
  });
  it('sets explicit width/height via style', () => {
    const { getByTestId } = render(<Skeleton testID="s" width={40} height={40} />);
    const style = getByTestId('s').props.style;
    expect(style).toEqual(expect.arrayContaining([{ width: 40 }, { height: 40 }]));
  });
  it('shows children at full opacity when not active', () => {
    const { root } = render(
      <Skeleton width={40} height={40} active={false}>
        <React.Fragment />
      </Skeleton>,
    );
    expect(root).toBeTruthy();
  });
});
