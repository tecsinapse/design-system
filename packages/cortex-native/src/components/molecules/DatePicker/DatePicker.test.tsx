import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#353231',
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('../../atoms/Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: (props: { name: string }) => <Text>{props.name}</Text>,
  };
});

import DatePicker from './DatePicker';

describe('DatePicker', () => {
  it('renders the placeholder when there is no value', () => {
    const { getByText } = render(
      <DatePicker type="day" placeholder="pick a date" onChange={() => {}} />,
    );
    expect(getByText('pick a date')).toBeTruthy();
  });

  it('formats the selected day with the given format', () => {
    const { getByText } = render(
      <DatePicker
        type="day"
        value={new Date(2026, 7, 15)}
        format="yyyy-MM-dd"
        onChange={() => {}}
      />,
    );
    expect(getByText('2026-08-15')).toBeTruthy();
  });

  it('opens the calendar modal and calls onChange when a day is picked', () => {
    const onChange = jest.fn();
    const { getByText, getByRole } = render(
      <DatePicker
        type="day"
        year={2026}
        month={7}
        placeholder="pick"
        onChange={onChange}
      />,
    );
    fireEvent.press(getByRole('button'));
    expect(getByText('August 2026')).toBeTruthy();
    fireEvent.press(getByText('15'));
    expect(onChange).toHaveBeenCalled();
  });
});
