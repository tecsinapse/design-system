import clsx from 'clsx';
import React from 'react';
import { useDateSegment } from 'react-aria';
import { DateFieldState, DateSegment as DateSegmentType } from 'react-stately';

interface DateSegmentProps {
  segment: DateSegmentType;
  state: DateFieldState;
}

export const DateSegment = ({ segment, state }: DateSegmentProps) => {
  const ref = React.useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={clsx(
        'focus:outline-none focus:bg-secondary-light',
        state.isDisabled ? 'text-secondary-light' : ''
      )}
    >
      {segment.text}
    </div>
  );
};
