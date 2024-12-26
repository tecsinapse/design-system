import { inputBox, labelStyle } from '@tecsinapse/cortex-core';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { IoMdClose } from 'react-icons/io';
import { LiaCalendar } from 'react-icons/lia';
import { DateRange } from '../Calendar';
import { Input, InputProps } from '../Input';

interface DatePickerInputBaseProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  /** child element */
  children: React.ReactElement;
  value?: Date | DateRange;
  onClickCleanIcon?: () => void;
  onClickCalendarIcon?: () => void;
  disabled?: boolean;
}

export const DatePickerInputBase = ({
  children,
  variants,
  label,
  disabled,
  value,
  onClickCleanIcon,
  onClickCalendarIcon,
}: DatePickerInputBaseProps) => {
  const iconStyle = useMemo(
    () =>
      clsx('mt-centi', !disabled ? 'cursor-pointer' : 'text-secondary-light'),
    [disabled]
  );

  const showCloseIcon = useMemo(() => {
    const hasDate = (value as Date) != undefined;
    const hasStartDate = (value as DateRange)?.start != undefined;
    const hasEndDate = (value as DateRange)?.end != undefined;

    if (value && 'start' in value) return hasStartDate && hasEndDate;

    return hasDate;
  }, [value]);

  return (
    <Input.Face variants={variants} data-testid={'date-picker-input-base'}>
      <span className={labelStyle({})}>{label}</span>
      <div className={inputBox('', label, 'w-full flex flex-row')}>
        {children}
      </div>
      <Input.Right className={''}>
        {showCloseIcon ? (
          <IoMdClose
            className={iconStyle}
            onClick={onClickCleanIcon}
            data-testid="date-picker-input-base-clean-icon"
          />
        ) : (
          <LiaCalendar
            onClick={onClickCalendarIcon}
            className={iconStyle}
            data-testid="date-picker-input-base-calendar-icon"
          />
        )}
      </Input.Right>
    </Input.Face>
  );
};
