import React from 'react';
import { useTimeField } from '../../hooks/useTimeField';
import { DateSegment } from '../DatePicker/DateSegment';
import { TimeValueType } from './TimeFieldInput';

export interface TimeFieldProps {
  value?: TimeValueType;
  onChange: (number: TimeValueType) => void;
}

export const TimeField = (props: TimeFieldProps) => {
  const { fieldProps, ref, state } = useTimeField(props);

  return (
    <div {...fieldProps} ref={ref} className={'flex flex-row'}>
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
};
