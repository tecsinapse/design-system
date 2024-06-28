import React from 'react';
import { useLocale, useTimeField } from 'react-aria';
import { useTimeFieldState } from 'react-stately';
import { Time } from '@internationalized/date';
import { TimeValueT } from './TimeFieldInput';
import { DateSegment } from './DateSegment';

interface TimeFieldProps {
  value?: TimeValueT;
  onChange: (number: TimeValueT) => void;
}

const TimeField = (props: TimeFieldProps) => {
  const { value, onChange } = props;
  const { locale } = useLocale();
  const state = useTimeFieldState({
    value: new Time(value?.hour, value?.minute),
    onChange: (timeValue: Time) =>
      onChange({ hour: timeValue.hour, minute: timeValue.minute }),
    locale,
  });

  const ref = React.useRef(null);
  const { fieldProps } = useTimeField({}, state, ref);

  return (
    <div {...fieldProps} ref={ref} className={'flex flex-row'}>
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
};

export default TimeField;
