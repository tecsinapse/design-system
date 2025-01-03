import { CalendarDate, CalendarDateTime } from '@internationalized/date';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { DateValue } from 'react-aria';
import { DateField } from '../components';

jest.mock('../components/DatePicker/DateSegment', () => ({
  DateSegment: ({ segment }: { segment: { text: string } }) => (
    <span>{segment.text}</span>
  ),
}));

describe('DateField', () => {
  const mockOnChange = jest.fn();
  const value: DateValue = new CalendarDate(2024, 6, 4);

  it('Should render DateField component', () => {
    render(<DateField value={value} onChange={mockOnChange} />);

    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('Should call onChange when value change', () => {
    render(<DateField value={value} onChange={mockOnChange} />);

    const newYear = 2025;
    const newMonth = 8;
    const newDay = 24;

    fireEvent.click(screen.getByText('2024'));
    mockOnChange({ year: newYear, month: value.month, day: value.day });

    fireEvent.click(screen.getByText('6'));
    mockOnChange({ year: newYear, month: newMonth, day: value.day });

    fireEvent.click(screen.getByText('4'));
    mockOnChange({ year: newYear, month: newMonth, day: newDay });

    expect(mockOnChange).toHaveBeenCalledWith({
      year: newYear,
      month: value.month,
      day: value.day,
    });
    expect(mockOnChange).toHaveBeenCalledWith({
      year: newYear,
      month: newMonth,
      day: value.day,
    });
    expect(mockOnChange).toHaveBeenCalledWith({
      year: newYear,
      month: newMonth,
      day: newDay,
    });
  });

  it('Should call onClickDate and onClickTime if passed', () => {
    const onClickDateMock = jest.fn();
    const onClickTimeMock = jest.fn();
    const value: DateValue = new CalendarDateTime(2024, 6, 4, 13, 30, 15);

    render(
      <DateField
        hourCycle={24}
        granularity="second"
        value={value}
        onClickDate={onClickDateMock}
        onClickTime={onClickTimeMock}
      />
    );

    const yearDateFieldSegmentDiv = screen.getByText('2024');
    const monthDateFieldSegmentDiv = screen.getByText('6');
    const dayDateFieldSegmentDiv = screen.getByText('4');

    fireEvent.click(yearDateFieldSegmentDiv.parentElement!);
    fireEvent.click(monthDateFieldSegmentDiv.parentElement!);
    fireEvent.click(dayDateFieldSegmentDiv.parentElement!);

    const hourDateFieldSegmentDiv = screen.getByText('13');
    const minuteDateFieldSegmentDiv = screen.getByText('30');
    const secondDateFieldSegmentDiv = screen.getByText('15');

    fireEvent.click(hourDateFieldSegmentDiv.parentElement!);
    fireEvent.click(minuteDateFieldSegmentDiv.parentElement!);
    fireEvent.click(secondDateFieldSegmentDiv.parentElement!);

    expect(onClickDateMock).toHaveBeenCalledTimes(3);
    expect(onClickTimeMock).toHaveBeenCalledTimes(3);
  });

  it('Should not call onClickDate and onClickTime if click literal', () => {
    const onClickDateMock = jest.fn();
    const onClickTimeMock = jest.fn();
    const value: DateValue = new CalendarDateTime(2024, 6, 4, 13, 30, 15);

    render(
      <DateField
        hourCycle={24}
        granularity="second"
        value={value}
        onClickDate={onClickDateMock}
        onClickTime={onClickTimeMock}
      />
    );

    const dateLiteralFieldSegmentDiv = screen.queryAllByText('/');
    const timeLiteralDateFieldSegmentDiv = screen.queryAllByText(':');

    dateLiteralFieldSegmentDiv.forEach(it =>
      fireEvent.click(it.parentElement!)
    );
    timeLiteralDateFieldSegmentDiv.forEach(it =>
      fireEvent.click(it.parentElement!)
    );

    expect(onClickDateMock).toHaveBeenCalledTimes(0);
    expect(onClickTimeMock).toHaveBeenCalledTimes(0);
  });

  it('Should not call onClickDate and onClickTime if state is disabled', () => {
    const onClickDateMock = jest.fn();
    const onClickTimeMock = jest.fn();
    const value: DateValue = new CalendarDateTime(2024, 6, 4, 13, 30, 15);

    render(
      <DateField
        hourCycle={24}
        granularity="second"
        value={value}
        onClickDate={onClickDateMock}
        onClickTime={onClickTimeMock}
        isDisabled
      />
    );

    const dateLiteralFieldSegmentDiv = screen.queryAllByText('/');
    const timeLiteralDateFieldSegmentDiv = screen.queryAllByText(':');

    dateLiteralFieldSegmentDiv.forEach(it =>
      fireEvent.click(it.parentElement!)
    );
    timeLiteralDateFieldSegmentDiv.forEach(it =>
      fireEvent.click(it.parentElement!)
    );

    const yearDateFieldSegmentDiv = screen.getByText('2024');
    const monthDateFieldSegmentDiv = screen.getByText('6');
    const dayDateFieldSegmentDiv = screen.getByText('4');

    fireEvent.click(yearDateFieldSegmentDiv.parentElement!);
    fireEvent.click(monthDateFieldSegmentDiv.parentElement!);
    fireEvent.click(dayDateFieldSegmentDiv.parentElement!);

    const hourDateFieldSegmentDiv = screen.getByText('13');
    const minuteDateFieldSegmentDiv = screen.getByText('30');
    const secondDateFieldSegmentDiv = screen.getByText('15');

    fireEvent.click(hourDateFieldSegmentDiv.parentElement!);
    fireEvent.click(minuteDateFieldSegmentDiv.parentElement!);
    fireEvent.click(secondDateFieldSegmentDiv.parentElement!);

    expect(onClickDateMock).toHaveBeenCalledTimes(0);
    expect(onClickTimeMock).toHaveBeenCalledTimes(0);
  });
});
