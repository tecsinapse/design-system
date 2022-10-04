import {
  Button,
  Calendar,
  DatePicker as DatePickerCore,
  DatePickerProps,
  DateRange,
  Masks,
  SelectionType,
} from '@tecsinapse/react-core';
import React, { useCallback, useMemo, useState } from 'react';
import { Dropdown } from '../../atoms/Dropdown';
import { CalendarIcon } from '@tecsinapse/react-core/src/components/molecules/DatePicker/styled';
import { InputMask } from '@tecsinapse/react-web-kit';
import { parse, isValid } from 'date-fns';

export type WebDatePickerProps<T extends SelectionType> = Omit<
  DatePickerProps<T>,
  | 'CalendarComponent'
  | 'renderCalendar'
  | 'requestCloseCalendar'
  | 'requestShowCalendar'
> & {
  callbackAfterValidated?: (valid: boolean, message?: string) => void;
};

export const DatePicker = <T extends SelectionType>({
  value,
  type,
  locale,
  onChange,
  callbackAfterValidated,
  ...rest
}: WebDatePickerProps<T>): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const [controlledInput, setControlledInput] = useState<string>();
  const show = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);
  const [error, setError] = useState<boolean>(false);

  const getYear = useMemo(() => {
    if (value) {
      if (type === 'range') {
        if ((value as DateRange).lowest !== undefined)
          return new Date((value as DateRange).lowest).getFullYear();
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
          return new Date((value as DateRange).lowest).getMonth();
      } else {
        return new Date(value as Date).getMonth();
      }
    }
    return undefined;
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
            callbackAfterValidated?.(false, 'Data inválida');
          }
          if (controlledInput?.length === 8) {
            const auxData = parse(controlledInput, 'ddMMyyyy', new Date(), {
              locale,
            });
            const isValidDate = isValid(auxData);
            callbackAfterValidated?.(isValidDate, 'Data inválida');

            if (isValidDate && auxData !== value) {
              setError(false);
              onChange?.(auxData as typeof value);
            }
          }
          if (controlledInput?.length === 0) {
            setError(true);
            callbackAfterValidated?.(false, 'Data inválida');
          }
        }}
        mask={Masks.DATE}
        value={displayValue}
        hint={error ? 'Data inválida' : undefined}
        variant={error ? 'error' : 'default'}
        onChange={input => {
          setControlledInput(input);
          if ((error && input.length < 8) || isValid(value)) {
            callbackAfterValidated?.(true);
            setError(false);
          }
        }}
        placeholder={'Não informada'}
        rightComponent={
          <Button
            effect={'none'}
            variant={'text'}
            style={{ padding: 0 }}
            onPress={onPress}
          >
            <CalendarIcon name="calendar-sharp" type="ionicon" size="centi" />
          </Button>
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
        format={'dd/MM/yyyy'}
        month={getMonth}
        requestShowCalendar={show}
        requestCloseCalendar={close}
        renderCalendar={calendar => (
          <Dropdown visible={visible} setVisible={setVisible}>
            {calendar}
          </Dropdown>
        )}
      />
    );
  }
};
