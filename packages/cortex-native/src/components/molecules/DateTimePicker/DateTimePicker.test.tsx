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

import DateTimePicker from './DateTimePicker';

describe('DateTimePicker', () => {
  it('renders the placeholder when there is no value', () => {
    const { getByText } = render(
      <DateTimePicker placeholder="pick date time" onChange={() => {}} />,
    );
    expect(getByText('pick date time')).toBeTruthy();
  });

  it('formats the selected datetime with the given format', () => {
    const { getByText } = render(
      <DateTimePicker
        value={new Date(2026, 7, 15, 9, 5)}
        format="yyyy-MM-dd HH:mm"
        onChange={() => {}}
      />,
    );
    expect(getByText('2026-08-15 09:05')).toBeTruthy();
  });

  it('opens the selector modal', () => {
    const { getByRole, getByText } = render(
      <DateTimePicker
        mode="date"
        dateModalTitle="Pick date"
        placeholder="pick"
        onChange={() => {}}
      />,
    );
    fireEvent.press(getByRole('button'));
    expect(getByText('Pick date')).toBeTruthy();
  });
});
