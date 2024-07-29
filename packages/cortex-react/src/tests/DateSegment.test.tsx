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
    expect(dateSegmentElement).toHaveClass(
      'focus:outline-none focus:bg-secondary-light'
    );
    expect(dateSegmentElement).toHaveAttribute('aria-label', 'Mocked segment');
  });
});
