import React from 'react';
import { render } from '@testing-library/react-native';

import ScrollableSelector from './ScrollableSelector';

describe('ScrollableSelector', () => {
  it('renders month/year labels for MM-yyyy format', () => {
    const { getByText } = render(
      <ScrollableSelector
        format="MM-yyyy"
        monthLabel="Month"
        yearLabel="Year"
        onChange={() => {}}
      />,
    );
    expect(getByText('Month')).toBeTruthy();
    expect(getByText('Year')).toBeTruthy();
  });

  it('renders hour/minute labels for HH-mm format', () => {
    const { getByText } = render(
      <ScrollableSelector
        format="HH-mm"
        hourLabel="Hour"
        minuteLabel="Minute"
        onChange={() => {}}
      />,
    );
    expect(getByText('Hour')).toBeTruthy();
    expect(getByText('Minute')).toBeTruthy();
  });
});
