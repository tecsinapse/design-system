import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

import SnappingSlider from './SnappingSlider';

describe('SnappingSlider', () => {
  it('renders all children', () => {
    const { getByText } = render(
      <SnappingSlider showAmount={2} scrollAmount={1}>
        <Text>item 1</Text>
        <Text>item 2</Text>
        <Text>item 3</Text>
      </SnappingSlider>,
    );
    expect(getByText('item 1')).toBeTruthy();
    expect(getByText('item 2')).toBeTruthy();
    expect(getByText('item 3')).toBeTruthy();
  });

  it('renders a horizontal scroll view with snap offsets', () => {
    const { UNSAFE_getByType } = render(
      <SnappingSlider showAmount={2} scrollAmount={1}>
        <Text>a</Text>
        <Text>b</Text>
      </SnappingSlider>,
    );
    const scrollView = UNSAFE_getByType(
      require('react-native').ScrollView,
    );
    expect(scrollView.props.horizontal).toBe(true);
    expect(Array.isArray(scrollView.props.snapToOffsets)).toBe(true);
  });
});
