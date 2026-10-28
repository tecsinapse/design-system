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

  it('renders the backdrop with the dim scrim color and closes on backdrop tap', () => {
    const { getByRole, getByTestId, queryByText } = render(
      <DatePicker
        type="day"
        year={2026}
        month={7}
        placeholder="pick"
        onChange={() => {}}
      />,
    );
    fireEvent.press(getByRole('button'));
    const backdrop = getByTestId('datepicker-backdrop');
    expect(backdrop.props.style.backgroundColor).toBe('rgba(0, 0, 0, 0.5)');
    expect(queryByText('August 2026')).toBeTruthy();
    fireEvent.press(backdrop);
    expect(queryByText('August 2026')).toBeNull();
  });

  it('lets the calendar title row fill the sheet and respect the rounded top corners', () => {
    const { getByRole, getByTestId } = render(
      <DatePicker
        type="day"
        year={2026}
        month={7}
        placeholder="pick"
        onChange={() => {}}
      />,
    );
    fireEvent.press(getByRole('button'));
    // The sheet must NOT carry any padding utility — otherwise the bg-secondary-xlight
    // title row is inset ("cropped") by the sheet's padding. It must also carry
    // `overflow-hidden` so the title row's grey background is clipped to the sheet's
    // rounded-t-deca corners (otherwise the grey sticks out square at the corners).
    const sheet = getByTestId('datepicker-sheet');
    const className = sheet.props.className as string;
    expect(className).not.toMatch(/\bp-deca\b/);
    expect(className).not.toMatch(/\bpx-deca\b/);
    expect(className).not.toMatch(/\bpt-deca\b/);
    expect(className).toMatch(/\boverflow-hidden\b/);
    expect(className).toMatch(/\brounded-t-deca\b/);
  });
});
