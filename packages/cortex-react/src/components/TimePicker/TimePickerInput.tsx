import { Time } from '@internationalized/date';
import React from 'react';
import { InputProps } from '../Input';
import { useTimePickerInput } from '../../hooks';
import { Popover } from '../Popover';
import { Content } from '../Content';
import { TimeFieldInput } from './TimeFieldInput';
import { TimePickerSelector } from './TimePickerSelector';

export interface TimePickerInputProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  value?: Time;
  onChange: (value?: Time) => void;
  /** Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale. */
  hourCycle?: 12 | 24;
  /** Determines the smallest unit that is displayed in the date picker. By default, this is `"day"` for dates, and `"minute"` for times. */
  granularity?: 'hour' | 'minute' | 'second';
  disabled?: boolean;
  minuteInterval?: number;
  hourLabel?: string;
  minuteLabel?: string;
  dayPeriodLabel?: string;
}

/** TimePickerInput component */
const TimePickerInputWithPopover = (props: TimePickerInputProps) => {
  const {
    onChange,
    value,
    label,
    variants,
    hourCycle = 24,
    disabled = false,
    granularity = 'minute',
    minuteInterval = 1,
    hourLabel,
    minuteLabel,
    dayPeriodLabel,
  } = props;

  const {
    handleTogglePopover,
    handleTimeFieldChange,
    handleChangeTimeOnSelector,
    popoverTime,
  } = useTimePickerInput({
    value,
    onChange,
    minuteInterval,
  });

  return (
    <>
      <Popover.Trigger disabled={true}>
        <TimeFieldInput
          variants={variants}
          label={label}
          disabled={disabled}
          value={value}
          onChange={handleTimeFieldChange}
          onClean={() => handleTimeFieldChange(null)}
          onToggle={handleTogglePopover}
          hourCycle={hourCycle}
          granularity={granularity}
        />
      </Popover.Trigger>
      <Popover.Content
        className="bg-surface-overlay shadow-default border-none p-deca flex flex-col"
        initialFocus={-1}
      >
        <TimePickerSelector
          onChangeTime={handleChangeTimeOnSelector}
          value={popoverTime}
          hourCycle={hourCycle}
          minuteInterval={minuteInterval}
          onPressOkButton={handleTogglePopover}
          hourLabel={hourLabel}
          minuteLabel={minuteLabel}
          dayPeriodLabel={dayPeriodLabel}
        />
      </Popover.Content>
    </>
  );
};

/** TimePickerInput component, extends HTML Input Element props*/
export const TimePickerInput = (props: TimePickerInputProps) => (
  <Popover.Root placement="bottom-start" trigger="click">
    <Content>
      <TimePickerInputWithPopover {...props} />
    </Content>
  </Popover.Root>
);
