import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#ffffff',
}));

import PressableSurface from './PressableSurface';

describe('PressableSurface', () => {
  it('passes through onPress', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<PressableSurface testID="ps" onPress={onPress} />);
    fireEvent.press(getByTestId('ps'));
    expect(onPress).toHaveBeenCalled();
  });
  it('applies no pressed tint when effect is none', () => {
    const { getByTestId } = render(<PressableSurface testID="ps" effect="none" />);
    const style = getByTestId('ps').props.style;
    expect(style[0]).toEqual({ backgroundColor: 'transparent' });
  });
  it('applies the surfaceColor background when provided', () => {
    const { getByTestId } = render(
      <PressableSurface testID="ps" effect="none" surfaceColor="#ff0000" />,
    );
    const style = getByTestId('ps').props.style;
    expect(style[0]).toEqual({ backgroundColor: '#ff0000' });
  });
});
