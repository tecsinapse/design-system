import {
  Calendar,
  DatePicker as DatePickerCore,
  DatePickerProps,
  DateRange,
  SelectionType,
} from '@tecsinapse/react-core';
import React, { useCallback, useMemo, useState } from 'react';
import { Modal } from './Modal';

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

  return (
    <DatePickerCore
      {...rest}
      CalendarComponent={Calendar}
      value={value}
      type={type}
      year={getYear}
      month={getMonth}
      requestShowCalendar={show}
      requestCloseCalendar={close}
      renderCalendar={calendar => (
        <Modal animationType="fade" visible={visible} onRequestClose={close}>
          {calendar}
        </Modal>
      )}
    />
  );
};
