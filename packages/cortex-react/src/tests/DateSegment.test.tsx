import React from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateSegment } from '../components/DateSegment';
import { Time } from '@internationalized/date';
import { useDateSegment } from 'react-aria';
import {
  DateSegment as DateSegmentType,
  useTimeFieldState,
} from 'react-stately';
jest.mock('react-aria', () => ({
  useDateSegment: jest.fn(),
}));

const mockUseDateSegmentAria = jest.mocked(useDateSegment);

describe('DateSegment Component', () => {
  it('renders the DateSegment component', () => {
    mockUseDateSegmentAria.mockReturnValue({
      segmentProps: {
        'aria-label': 'Mocked segment',
        tabIndex: -1,
      },
    });

    const segment: DateSegmentType = {
      type: 'hour',
      text: '03',
      placeholder: '',
      isPlaceholder: false,
      isEditable: false,
    };

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
    expect(dateSegmentElement).toHaveClass('text-sub accent-transparent');
    expect(dateSegmentElement).toHaveAttribute('aria-label', 'Mocked segment');
  });
});
