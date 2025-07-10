import React, { useCallback, useEffect } from 'react';
import {
  AriaTimeFieldProps,
  TimeValue,
  useLocale,
  useTimeField,
} from 'react-aria';
import {
  DateSegment as DateSegmentType,
  useTimeFieldState,
} from 'react-stately';
import { DateSegment } from '../DatePicker/DateSegment';

export interface TimeFieldProps extends AriaTimeFieldProps<TimeValue> {
  disabled?: boolean;
  onClickTime?: () => void;
}

const formatLiteralSegment = (text: string): string => {
  return text.includes(',') ? text.replace(/,/g, ' ') : text;
};

export const TimeField = ({ onClickTime, ...props }: TimeFieldProps) => {
  const { value } = props;

  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale: locale,
    shouldForceLeadingZeros: true,
  });

  const ref = React.useRef(null);
  const { fieldProps } = useTimeField(
    { 'aria-label': 'time-field' },
    state,
    ref
  );

  const handleOnClickSegment = useCallback(
    (segment: DateSegmentType) => {
      if (!segment.isEditable || state.isDisabled) return;

      if (['hour', 'minute', 'second', 'dayPeriod'].includes(segment.type)) {
        onClickTime?.();
      }
    },
    [onClickTime, state.isDisabled]
  );

  useEffect(() => {
    if (!value) {
      state.setValue(null);
    }
  }, [value]);

  return (
    <div {...fieldProps} ref={ref} className={'flex flex-row'}>
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
