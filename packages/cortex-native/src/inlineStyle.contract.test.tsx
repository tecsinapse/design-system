import React from 'react';
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#ffffff',
}));

import Input from './components/atoms/Input/Input';

describe('layout expressed as classes, not inline styles', () => {
  it('Input renders its min height as a class', () => {
    const { getByTestId } = render(<Input inputContainerTestID="face" />);
    const face = getByTestId('face');
    expect(face.props.className as string).toContain('min-h-[50px]');
    expect(
      (StyleSheet.flatten(face.props.style) ?? {}).minHeight
    ).toBeUndefined();
  });
});
