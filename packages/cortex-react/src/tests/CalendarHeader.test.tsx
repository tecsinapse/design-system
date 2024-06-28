import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  CalendarHeader,
  CalendarHeaderProps,
} from '../components/CalendarHeader';

const title = 'Junho De 2026';

const props: CalendarHeaderProps = {
  onClickPrevButton: jest.fn(),
  onClickNextButton: jest.fn(),
  title: title,
};

describe('CalendarHeader', () => {
  it('Should render title', () => {
    render(<CalendarHeader {...props} />);

    const calendarHeaderElement = screen.getByTestId('calendar-header');

    expect(calendarHeaderElement).toBeInTheDocument();
    expect(calendarHeaderElement).toHaveTextContent(title);
  });

  it('Should call onClickPrevButton', () => {
    render(<CalendarHeader {...props} />);

    const prevMonthButton = screen.getByTestId('calendar-header-prev-button');

    fireEvent.click(prevMonthButton);

    expect(props.onClickPrevButton).toHaveBeenCalled();
  });

  it('Should call onClickNextButton', () => {
    render(<CalendarHeader {...props} />);

    const nextMonthButton = screen.getByTestId('calendar-header-next-button');

    fireEvent.click(nextMonthButton);

    expect(props.onClickNextButton).toHaveBeenCalled();
  });
});
