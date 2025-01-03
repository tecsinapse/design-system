import React from 'react';
import {
  AriaTimeFieldProps,
  TimeValue,
  useLocale,
  useTimeField,
} from 'react-aria';
import { useTimeFieldState } from 'react-stately';
import { DateSegment } from '../DatePicker/DateSegment';

export interface TimeFieldProps extends AriaTimeFieldProps<TimeValue> {
  disabled?: boolean;
}

export const TimeField = ({ disabled, ...props }: TimeFieldProps) => {
  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale,
    isDisabled: disabled,
  });
  const ref = React.useRef(null);
  const { fieldProps } = useTimeField(
    { 'aria-label': 'time-field' },
    state,
    ref
  );

  return (
    <div {...fieldProps} ref={ref} className={'flex flex-row'}>
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
};
