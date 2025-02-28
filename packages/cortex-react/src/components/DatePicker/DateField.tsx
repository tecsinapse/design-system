// DateField.tsx
import { createCalendar } from '@internationalized/date';
import React, { useCallback } from 'react';
import {
  AriaDateFieldProps,
  DateValue,
  useDateField,
  useLocale,
} from 'react-aria';
import {
  DateSegment as DateSegmentType,
  useDateFieldState,
} from 'react-stately';
import { DateSegment } from './DateSegment';

interface DateFieldProps extends AriaDateFieldProps<DateValue> {
  onClickDate?: () => void;
  onClickTime?: () => void;
}

const formatLiteralSegment = (text: string): string => {
  return text.includes(',') ? text.replace(/,/g, ' ') : text;
};

export const DateField = ({
  onClickDate,
  onClickTime,
  ...props
}: DateFieldProps) => {
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

  const handleOnClickSegment = useCallback(
    (segment: DateSegmentType) => {
      if (!segment.isEditable || state.isDisabled) return;

      if (['hour', 'minute', 'second'].includes(segment.type)) {
        onClickTime?.();
      }
      if (['year', 'month', 'day'].includes(segment.type)) {
        onClickDate?.();
      }
    },
    [onClickDate, onClickTime, state.isDisabled]
  );

  return (
    <div
      {...fieldProps}
      ref={ref}
      className="flex flex-row"
      data-testid="date-field-div"
    >
      {state.segments.map((segment, i) => {
        if (segment.type === 'literal') {
          const text = formatLiteralSegment(segment.text);
          return (
            <span key={i} style={{ whiteSpace: 'pre' }}>
              {text}
            </span>
          );
        }

        return (
          <div key={i} onClick={() => handleOnClickSegment(segment)}>
            <DateSegment segment={segment} state={state} />
          </div>
        );
      })}
    </div>
  );
};
