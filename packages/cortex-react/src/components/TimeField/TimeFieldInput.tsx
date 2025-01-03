import { Time } from '@internationalized/date';
import { inputBox, labelStyle } from '@tecsinapse/cortex-core';
import React from 'react';
import { timeFromTimeValue } from '../../utils';
import { Input, InputPropsBase } from '../Input';
import { TimeField } from './TimeField';

export interface TimeFieldInputProps extends InputPropsBase {
  value?: Time;
  onChange: (value?: Time) => void;
  /** Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale. */
  hourCycle?: 12 | 24;
  /** Determines the smallest unit that is displayed in the date picker. By default, this is `"day"` for dates, and `"minute"` for times. */
  granularity?: 'hour' | 'minute' | 'second';
  disabled?: boolean;
}

/** TimeFieldInput component */
export const TimeFieldInput = (props: TimeFieldInputProps) => {
  const {
    onChange,
    value,
    label,
    variants,
    hourCycle = 24,
    granularity = 'minute',
    disabled = false,
  } = props;

  return (
    <>
      <Input.Face
        variants={variants}
        className={'flex flex-row'}
        data-testid={'time-field-input'}
      >
        <span className={labelStyle({})}>{label}</span>
        <div className={inputBox('', label)}>
          <TimeField
            onChange={value => {
              onChange(timeFromTimeValue(value));
            }}
            value={value}
            hourCycle={hourCycle}
            granularity={granularity}
            isDisabled={disabled}
          />
        </div>
      </Input.Face>
    </>
  );
};
