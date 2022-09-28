import {
  Button,
  Calendar,
  DatePicker as DatePickerCore,
  DatePickerProps,
  DateRange,
  Masks,
  SelectionType,
} from '@tecsinapse/react-core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dropdown } from '../../atoms/Dropdown';
import { CalendarIcon } from '@tecsinapse/react-core/src/components/molecules/DatePicker/styled';
import { InputMask } from '@tecsinapse/react-web-kit';
import { isValid, parse } from 'date-fns';

export type WebDatePickerProps<T extends SelectionType> = Omit<
  DatePickerProps<T>,
  | 'CalendarComponent'
  | 'renderCalendar'
  | 'requestCloseCalendar'
  | 'requestShowCalendar'
>;

export const DatePicker = <T extends SelectionType>({
  value,
  type,
  locale,
  onChange,
  ...rest
}: WebDatePickerProps<T>): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const show = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

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

  const [input, setInput] = useState<string>();

  useEffect(() => {
    console.debug('value effect', input);
  }, [input]);

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
      controlComponent={(onPress, displayValue) => {
        return (
          <InputMask
            mask={Masks.DATE}
            value={input}
            onChange={setInput}
            // onChange={value1 => {
            //   onChange?.();
            //   // console.debug(value1, 'TEST');
            //   // const test = parse(value1, 'dd/MM/yyyy', new Date(), { locale });
            //   // console.log(test, ' FORMAT');
            //   // console.debug('data é valida', isValid(test));
            // }}
            placeholder={'Não informada'}
            rightComponent={
              <Button
                effect={'none'}
                variant={'text'}
                style={{ padding: 0 }}
                onPress={onPress}
              >
                <CalendarIcon
                  name="calendar-sharp"
                  type="ionicon"
                  size="centi"
                />
              </Button>
            }
          />
        );
      }}
    />
  );
};
