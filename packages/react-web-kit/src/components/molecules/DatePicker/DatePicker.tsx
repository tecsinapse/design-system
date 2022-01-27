import {
  Calendar,
  DatePicker as DatePickerCore,
  DatePickerProps,
  SelectionType,
} from '@tecsinapse/react-core';
import React, { useCallback, useState } from 'react';
import { Dropdown } from '../../atoms/Dropdown';

export type WebDatePickerProps<T extends SelectionType> = Omit<
  DatePickerProps<T>,
  | 'CalendarComponent'
  | 'renderCalendar'
  | 'requestCloseCalendar'
  | 'requestShowCalendar'
>;

export const DatePicker = <T extends SelectionType>({
  ...rest
}: WebDatePickerProps<T>): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  const show = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  return (
    <DatePickerCore
      {...rest}
      CalendarComponent={Calendar}
      requestShowCalendar={show}
      requestCloseCalendar={close}
      renderCalendar={calendar => (
        <Dropdown visible={visible} setVisible={setVisible}>
          {calendar}
        </Dropdown>
      )}
    />
  );
};
