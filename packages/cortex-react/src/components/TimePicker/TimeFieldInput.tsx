import { Time } from '@internationalized/date';
import { inputBox, labelStyle } from '@tecsinapse/cortex-core';
import React, { useMemo } from 'react';
import { Input, InputProps } from '../Input';
import { LiaClock } from 'react-icons/lia';
import { timePickerInputBase as timeFieldInput } from '../../styles/time-field-input';
import { IoMdClose } from 'react-icons/io';
import { TimeValue } from 'react-aria';
import { TimeField } from './TimeField';

interface TimePickerInputBaseProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  value?: TimeValue;
  onChange: (value: TimeValue | null) => void;
  onClean?: () => void;
  onToggle?: () => void;
  disabled?: boolean;
  hourCycle?: 12 | 24;
  granularity?: 'hour' | 'minute' | 'second';
}

const { icon } = timeFieldInput();

export const TimeFieldInput = ({
  variants,
  label,
  disabled = false,
  value,
  onChange,
  onToggle,
  onClean,
  hourCycle,
  granularity,
}: TimePickerInputBaseProps) => {
  const showCloseIcon = useMemo(() => {
    const hasTime = (value as Time) != undefined;
    return hasTime;
  }, [value]);

  return (
    <Input.Face
      variants={variants}
      className={'flex flex-row justify-between'}
      data-testid={'time-field-input'}
    >
      <span className={labelStyle({})}>{label}</span>
      <div className={inputBox('', label)}>
        <TimeField
          onClickTime={onToggle}
          disabled={disabled}
          value={value}
          onChange={onChange}
          hourCycle={hourCycle}
          granularity={granularity}
        />
      </div>
      <Input.Right className="h-full justify-center">
        {showCloseIcon ? (
          <button
            className="flex bg-transparent items-center"
            onClick={onClean}
            disabled={disabled}
            data-testid="time-picker-input-base-clean-button"
            type="button"
          >
            <IoMdClose
              className={icon({ disabled })}
              data-testid="time-picker-input-base-clean-icon"
            />
          </button>
        ) : (
          <button
            className="flex bg-transparent items-center"
            onClick={onToggle}
            disabled={disabled}
            data-testid="time-picker-input-base-calendar-button"
            type="button"
          >
            <LiaClock
              className={icon({ disabled })}
              data-testid="time-picker-input-base-calendar-icon"
            />
          </button>
        )}
      </Input.Right>
    </Input.Face>
  );
};
