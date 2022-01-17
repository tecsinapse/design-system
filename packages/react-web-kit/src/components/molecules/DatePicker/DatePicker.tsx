import {
  Calendar,
  DatePicker as DatePickerCore, DatePickerProps, SelectionType
} from '@tecsinapse/react-core';
import React, { useCallback, useState } from 'react';
import { Modal } from './Modal';

export const DatePicker = <T extends SelectionType>({ ...rest }: Omit<DatePickerProps<T>, 'CalendarComponent' | 'renderCalendar' | 'requestCloseCalendar' | 'requestShowCalendar'>): JSX.Element => {

  const [ visible, setVisible ] = useState(false)
  const show = useCallback(() => setVisible(true), [])
  const close = useCallback(() => setVisible(false), [])
  
  return (
    <DatePickerCore
      {...rest}
      CalendarComponent={Calendar}
      requestShowCalendar={show}
      requestCloseCalendar={close}
      renderCalendar={(calendar) => (
        <Modal animationType='fade' visible={visible} onRequestClose={close}>
          {calendar}
        </Modal>
      )}
    />
  );
};