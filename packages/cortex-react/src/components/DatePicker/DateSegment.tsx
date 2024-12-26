import React from 'react';
import { useDateSegment } from 'react-aria';
import { DateFieldState, DateSegment as DateSegmentType } from 'react-stately';
import { dateSegment } from '../../styles';

interface DateSegmentProps {
  segment: DateSegmentType;
  state: DateFieldState;
}

const { base } = dateSegment();

export const DateSegment = ({ segment, state }: DateSegmentProps) => {
  const ref = React.useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={base({ disabled: state.isDisabled })}
    >
      {segment.text}
    </div>
  );
};
