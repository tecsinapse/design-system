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
        value={new Date(2026, 7, 15)}
        placeholder="pick"
        onChange={() => {}}
      />,
    );
    fireEvent.press(getByRole('button'));
    expect(getByText('August 2026')).toBeTruthy();
  });

  it('renders the backdrop with the dim scrim color and closes on backdrop tap', () => {
    const { getByRole, getByTestId, queryByText } = render(
      <DateTimePicker
        mode="date"
        value={new Date(2026, 7, 15)}
        placeholder="pick"
        onChange={() => {}}
      />,
    );
    fireEvent.press(getByRole('button'));
    const backdrop = getByTestId('datetimepicker-backdrop');
    expect(backdrop.props.style.backgroundColor).toBe('rgba(0, 0, 0, 0.5)');
    expect(queryByText('August 2026')).toBeTruthy();
    fireEvent.press(backdrop);
    expect(queryByText('August 2026')).toBeNull();
  });

  it('lets the calendar title row fill the sheet and respect the rounded top corners', () => {
    const { getByRole, getByTestId } = render(
      <DateTimePicker
        mode="date"
        value={new Date(2026, 7, 15)}
        placeholder="pick"
        onChange={() => {}}
      />,
    );
    fireEvent.press(getByRole('button'));
    const sheet = getByTestId('datetimepicker-sheet');
    const className = sheet.props.className as string;
    expect(className).not.toMatch(/\bp-deca\b/);
    expect(className).not.toMatch(/\bpx-deca\b/);
    expect(className).not.toMatch(/\bpt-deca\b/);
    expect(className).toMatch(/\boverflow-hidden\b/);
    expect(className).toMatch(/\brounded-t-deca\b/);
  });
});
