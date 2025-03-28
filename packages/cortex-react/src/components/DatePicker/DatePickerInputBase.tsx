import { inputBox, labelStyle } from '@tecsinapse/cortex-core';
import React, { useMemo } from 'react';
import { IoMdClose } from 'react-icons/io';
import { LiaCalendar } from 'react-icons/lia';
import { datePickerInputBase } from '../../styles';
import { DateRange } from '../Calendar';
import { Input, InputProps } from '../Input';

interface DatePickerInputBaseProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  /** child element */
  children: React.ReactElement;
  value?: Date | DateRange;
  onClean?: () => void;
  onToggle?: () => void;
  disabled?: boolean;
}

const { icon } = datePickerInputBase();

export const DatePickerInputBase = ({
  children,
  variants,
  label,
  disabled = false,
  value,
  onClean,
  onToggle,
}: DatePickerInputBaseProps) => {
  const showCloseIcon = useMemo(() => {
    const hasDate = (value as Date) != undefined;
    const hasStartDate = (value as DateRange)?.start != undefined;
    const hasEndDate = (value as DateRange)?.end != undefined;

    if (value && 'start' in value) return hasStartDate && hasEndDate;

    return hasDate;
  }, [value]);

  return (
    <Input.Face variants={variants} data-testid={'date-picker-input-base'}>
      <label className={labelStyle({})}>{label}</label>
      <div className={inputBox('', label, 'w-full flex flex-row')}>
        {children}
      </div>
      <Input.Right className="flex h-full justify-center">
        {showCloseIcon ? (
          <button
            className="bg-transparent"
            onClick={onClean}
            disabled={disabled}
            data-testid="date-picker-input-base-clean-button"
            type="button"
          >
            <IoMdClose
              className={icon({ disabled })}
              data-testid="date-picker-input-base-clean-icon"
            />
          </button>
        ) : (
          <button
            className="bg-transparent"
            onClick={onToggle}
            disabled={disabled}
            data-testid="date-picker-input-base-calendar-button"
            type="button"
          >
            <LiaCalendar
              className={icon({ disabled })}
              data-testid="date-picker-input-base-calendar-icon"
            />
          </button>
        )}
      </Input.Right>
    </Input.Face>
  );
};
