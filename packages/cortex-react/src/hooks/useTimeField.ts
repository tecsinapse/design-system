import React from 'react';
import { useLocale, useTimeField as UseTimeFieldRA } from 'react-aria';
import { useTimeFieldState } from 'react-stately';
import { Time } from '@internationalized/date';
import { TimeFieldProps } from '../components/TimeField';

export const useTimeField = (props: TimeFieldProps) => {
  const { value, onChange } = props;
  const { locale } = useLocale();
  const state = useTimeFieldState({
    value: new Time(value?.hour, value?.minute),
    onChange: (timeValue: Time) =>
      onChange({ hour: timeValue.hour, minute: timeValue.minute }),
    locale,
  });

  const ref = React.useRef(null);
  const { fieldProps } = UseTimeFieldRA(
    {
      'aria-label': 'time-field',
      hourCycle: 24,
    },
    state,
    ref
  );
  return {
    fieldProps,
    ref,
    state,
  };
};
