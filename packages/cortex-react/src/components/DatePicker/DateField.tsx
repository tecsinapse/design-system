import { createCalendar } from '@internationalized/date';
import React from 'react';
import {
  AriaDateFieldProps,
  DateValue,
  useDateField,
  useLocale,
} from 'react-aria';
import { useDateFieldState } from 'react-stately';
import { DateSegment } from './DateSegment';

interface DateFieldProps extends AriaDateFieldProps<DateValue> {}

export const DateField = (props: DateFieldProps) => {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    createCalendar,
    locale,
  });

  const ref = React.useRef(null);
  const { fieldProps } = useDateField(
    { 'aria-label': 'date-field' },
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
