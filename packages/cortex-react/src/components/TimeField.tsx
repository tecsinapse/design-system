import React from 'react';
import { TimeValueType } from './TimeFieldInput';
import { DateSegment } from './DateSegment';
import { useTimeField } from '../hooks/useTimeField';

export interface TimeFieldProps {
  value?: TimeValueType;
  onChange: (number: TimeValueType) => void;
}

const TimeField = (props: TimeFieldProps) => {
  const { fieldProps, ref, state } = useTimeField(props);

  return (
    <div {...fieldProps} ref={ref} className={'flex flex-row'}>
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
};

export default TimeField;
