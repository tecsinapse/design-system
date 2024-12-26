import { Time } from '@internationalized/date';
import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import { useDateSegment } from 'react-aria';
import {
  DateSegment as DateSegmentType,
  useTimeFieldState,
} from 'react-stately';
import { DateSegment } from '../components';

jest.mock('react-aria', () => ({
  useDateSegment: jest.fn(),
}));

const mockUseDateSegmentAria = jest.mocked(useDateSegment);

const segment: DateSegmentType = {
  type: 'hour',
  text: '03',
  placeholder: '',
  isPlaceholder: false,
  isEditable: false,
};

describe('DateSegment Component', () => {
  beforeEach(() => {
    mockUseDateSegmentAria.mockReturnValue({
      segmentProps: {
        'aria-label': 'Mocked segment',
        tabIndex: -1,
      },
    });
  });

  it('Should render the DateSegment component', () => {
    const { result } = renderHook(() =>
      useTimeFieldState({
        value: new Time(3, 26),
        onChange: jest.fn(),
        locale: 'pt-BR',
      })
    );

    render(<DateSegment segment={segment} state={result.current} />);
    const dateSegmentElement = screen.getByText('03');

    expect(dateSegmentElement).toBeInTheDocument();
    expect(dateSegmentElement).toHaveClass(
      'focus:outline-none focus:bg-secondary-light'
    );
    expect(dateSegmentElement).toHaveAttribute('aria-label', 'Mocked segment');
  });

  it('Should show correct style when state is disabled', () => {
    const { result } = renderHook(() =>
      useTimeFieldState({
        value: new Time(3, 26),
        onChange: jest.fn(),
        locale: 'pt-BR',
        isDisabled: true,
      })
    );

    render(<DateSegment segment={segment} state={result.current} />);
    const dateSegmentElement = screen.getByText('03');

    expect(dateSegmentElement).toBeInTheDocument();
    expect(dateSegmentElement).toHaveClass(
      'focus:outline-none focus:bg-secondary-light text-secondary-light'
    );
    expect(dateSegmentElement).toHaveAttribute('aria-label', 'Mocked segment');
  });
});
