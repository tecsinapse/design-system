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
  it('omits inline backgroundColor when no surfaceColor is given (className bg wins)', () => {
    const { getByTestId } = render(<PressableSurface testID="ps" effect="none" />);
    const style = getByTestId('ps').props.style as Array<unknown>;
    // composedStyle is [no-bgColor-entry, undefined consumerStyle] — so style[0] is
    // `undefined` (the optional spread is empty). Crucially, no backgroundColor is
    // emitted, which lets uniwind className-based backgrounds (e.g.
    // `bg-primary-light` on Calendar between cells, `bg-secondary-xlight` behind
    // Calendar chevrons) actually render.
    expect(style[0]).toBeUndefined();
  });
  it('applies the surfaceColor background when provided', () => {
    const { getByTestId } = render(
      <PressableSurface testID="ps" effect="none" surfaceColor="#ff0000" />,
    );
    const style = getByTestId('ps').props.style;
    expect(style[0]).toEqual({ backgroundColor: '#ff0000' });
  });
});
