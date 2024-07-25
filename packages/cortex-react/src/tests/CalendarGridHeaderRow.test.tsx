import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { CalendarGridHeaderRow } from '../components/Calendar/CalendarGridHeaderRow';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

describe('CalendarGridHeaderRow', () => {
  it('Should render with all columns and cells', () => {
    render(
      <table>
        <thead>
          <CalendarGridHeaderRow weekDays={weekDays} />
        </thead>
      </table>
    );

    const calendarGridHeaderElement = screen.getByTestId(
      'calendar-grid-header-row'
    );

    expect(calendarGridHeaderElement).toBeInTheDocument();
    expect(calendarGridHeaderElement.childElementCount).toBe(weekDays.length);
    weekDays.map((day, index) => {
      expect(calendarGridHeaderElement.children[index]).toHaveTextContent(day);
    });
  });
});
