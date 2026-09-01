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

  it('hides the title bar while the year picker is open', () => {
    const { getByText, queryByText, root } = render(
      <Calendar type="day" year={2026} month={7} onChange={() => {}} />,
    );
    // In month view the title is rendered inside the title row (chevrons + text).
    expect(getByText('August 2026')).toBeTruthy();
    // Click the title to open the year picker — the title row disappears
    // entirely (chevrons AND title), so the FlatList of years gets the full
    // sheet height.
    fireEvent.press(getByText('August 2026'));
    expect(queryByText('August 2026')).toBeNull();
    const titleRows = root.findAll(n => {
      const cn = n.props?.className;
      return (
        typeof cn === 'string' &&
        cn.includes('flex-row') &&
        cn.includes('items-center') &&
        cn.includes('justify-between')
      );
    });
    expect(titleRows).toHaveLength(0);
  });

  it('paints between-range cells with bg-primary-light via className', () => {
    // Range from 2026-08-04 to 2026-08-06 — Aug 5 is between.
    const { root } = render(
      <Calendar
        type="range"
        year={2026}
        month={7}
        value={{
          lowest: new Date(2026, 7, 4),
          highest: new Date(2026, 7, 6),
        }}
        onChange={() => {}}
      />,
    );
    // The between cell is the only PressableSurface in the grid whose className
    // carries `bg-primary-light` (the endpoints use an inner View with
    // `calendarCellSelected` instead, and the Sep-5 cell from the trailing week
    // is `bg-transparent`). With the PressableSurface fix, no inline
    // backgroundColor is emitted when no surfaceColor is passed, so the
    // className-based bg actually renders on screen.
    const betweenCells = root.findAll(n => {
      const cn = n.props?.className;
      return typeof cn === 'string' && cn.includes('bg-primary-light');
    });
    expect(betweenCells.length).toBeGreaterThan(0);
    expect(betweenCells[0].props.className).toContain('bg-primary-light');
  });
});
