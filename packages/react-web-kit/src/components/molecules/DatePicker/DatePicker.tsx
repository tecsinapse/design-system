import {
  Calendar,
  CalendarIcon,
  DatePicker as DatePickerCore,
  DatePickerProps,
  DateRange,
  Masks,
  PressableSurface,
  SelectionType,
  useTheme,
} from '@tecsinapse/react-core';
import { isValid, parse } from 'date-fns';
import React, { useCallback, useMemo, useState } from 'react';
import { Dropdown } from '../../atoms/Dropdown';
import { InputMask } from '../../atoms/InputMask';

export type WebDatePickerProps<T extends SelectionType> = Omit<
  DatePickerProps<T>,
  | 'CalendarComponent'
  | 'renderCalendar'
  | 'requestCloseCalendar'
  | 'requestShowCalendar'
> & {
  callbackAfterValidated?: (valid: boolean, message?: string) => void;
  invalidDateLabel?: string;
};

export const DatePicker = <T extends SelectionType>({
  value,
  type,
  locale,
  onChange,
  callbackAfterValidated,
  placeholder,
  disabled,
  label,
  invalidDateLabel = 'Invalid date',
  ...rest
}: WebDatePickerProps<T>): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const [controlledInput, setControlledInput] = useState<string>();
  const show = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);
  const [error, setError] = useState<boolean>(false);
  const theme = useTheme();

  const getYear = useMemo(() => {
    if (value) {
      if (type === 'range') {
        if ((value as DateRange).lowest !== undefined)
          return new Date((value as DateRange).lowest as Date).getFullYear();
      } else {
        return new Date(value as Date).getFullYear();
      }
    }
    return undefined;
  }, [value]);

  const getMonth = useMemo(() => {
    if (value) {
      if (type === 'range') {
        if ((value as DateRange).lowest !== undefined)
          return new Date((value as DateRange).lowest as Date).getMonth();
      } else {
        return new Date(value as Date).getMonth();
      }
    }
    return undefined;
  }, [value]);

  const checksFullRange = useCallback(() => {
    if (type === 'range' && !(value as DateRange)?.highest)
      onChange?.(undefined);
  }, [value]);

  const controlComponent = (onPress, displayValue) => {
    return (
      <InputMask
        onBlur={() => {
          if (
            (controlledInput ?? []).length < 8 &&
            (controlledInput ?? []).length > 0
          ) {
            setError(true);
            callbackAfterValidated?.(false, invalidDateLabel);
          }
          if (controlledInput?.length === 8) {
            const auxData = parse(controlledInput, 'ddMMyyyy', new Date(), {
              locale,
            });
            const isValidDate = isValid(auxData);
            callbackAfterValidated?.(isValidDate, invalidDateLabel);

            if (isValidDate && auxData !== value) {
              setError(false);
              onChange?.(auxData as typeof value);
            }
          }
        }}
        disabled={disabled}
        mask={Masks.DATE}
        value={displayValue ?? ''}
        hint={error ? invalidDateLabel : undefined}
        variant={error ? 'error' : 'default'}
        onChange={input => {
          setControlledInput(input);
          if ((error && input.length < 8) || isValid(value)) {
            callbackAfterValidated?.(true);
            setError(false);
          }
        }}
        placeholder={placeholder}
        label={label}
        placeholderTextColor={
          disabled ? theme.color.secondary.light : undefined
        }
        rightComponent={
          <PressableSurface
            effect={'none'}
            style={{ padding: 0 }}
            onPress={onPress}
            disabled={disabled}
          >
            <CalendarIcon name="calendar-sharp" type="ionicon" size="centi" />
          </PressableSurface>
        }
      />
    );
  };

  if (type === 'day') {
    return (
      <DatePickerCore
        {...rest}
        CalendarComponent={Calendar}
        onChange={onChange}
        locale={locale}
        value={value}
        type={type}
        year={getYear}
        disabled={disabled}
        format={'dd/MM/yyyy'}
        month={getMonth}
        requestShowCalendar={show}
        requestCloseCalendar={close}
        renderCalendar={calendar => (
          <Dropdown visible={visible} setVisible={setVisible}>
            {calendar}
          </Dropdown>
        )}
        controlComponent={controlComponent}
      />
    );
  } else {
    return (
      <DatePickerCore
        {...rest}
        CalendarComponent={Calendar}
        onChange={onChange}
        locale={locale}
        value={value}
        type={type}
        year={getYear}
        disabled={disabled}
        format={'dd/MM/yyyy'}
        month={getMonth}
        requestShowCalendar={show}
        requestCloseCalendar={close}
        placeholder={placeholder}
        label={label}
        renderCalendar={(calendar, handleBlur) => (
          <Dropdown
            visible={visible}
            setVisible={setVisible}
            onClickAway={() => {
              handleBlur?.();
              checksFullRange();
            }}
          >
            {calendar}
          </Dropdown>
        )}
      />
    );
  }
};
