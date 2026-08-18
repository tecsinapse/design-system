import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#353231',
}));

jest.mock('../../atoms/Icon/Icon', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: (props: { name: string }) => <Text>{props.name}</Text>,
  };
});

import Calendar from './Calendar';

describe('Calendar', () => {
  it('renders the month title', () => {
    const { getByText } = render(
      <Calendar type="day" year={2026} month={7} onChange={() => {}} />,
    );
    expect(getByText('August 2026')).toBeTruthy();
  });

  it('renders the weekday header', () => {
    const { getAllByText } = render(
      <Calendar type="day" year={2026} month={7} onChange={() => {}} />,
    );
    expect(getAllByText(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/).length).toBeGreaterThan(
      0,
    );
  });

  it('calls onChange with the picked date for day selection', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Calendar type="day" year={2026} month={7} onChange={onChange} />,
    );
    fireEvent.press(getByText('15'));
    expect(onChange).toHaveBeenCalled();
  });

  it('shows the selected day', () => {
    const { getByText } = render(
      <Calendar
        type="day"
        year={2026}
        month={7}
        value={new Date(2026, 7, 15)}
        onChange={() => {}}
      />,
    );
    expect(getByText('15')).toBeTruthy();
  });
});
