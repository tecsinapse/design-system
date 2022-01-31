import {
  DatePicker as DatePickerCore, DatePickerProps, SelectionType, Value
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { getLocale } from '../../../utils/date';
import { IBaseModal, ModalView, useLazyModalManager } from '../../atoms/Modal';
import { Text } from '../../atoms/Text';
import { Calendar } from '../Calendar';
import { CalendarBoxContent } from './styled';

export type NativeDatePickerProps<T extends SelectionType> = Omit<DatePickerProps<T>, 'CalendarComponent' | 'renderCalendar' | 'requestCloseCalendar' | 'requestShowCalendar'>

export const DatePicker = <T extends SelectionType>({ locale, onChange, ...rest }: NativeDatePickerProps<T>): JSX.Element => {

  const modal = useLazyModalManager()
  
  const handleChange = (value?: Value<T>) => {
    onChange?.(value)
    modal.requestUpdate()
  }
  
  return (
    <DatePickerCore
      {...rest}
      TextComponent={Text}
      CalendarComponent={Calendar}
      locale={locale ?? getLocale()}
      onChange={handleChange}
      requestShowCalendar={() => modal.show()}
      requestCloseCalendar={() => modal.close()}
      renderCalendar={(calendar, blur) => modal.sync(
        <NativeModal onClose={blur}>
          {calendar}
        </NativeModal>
      )}
    />
  );

};

const NativeModal: FC<IBaseModal> = ({ children, ...others }) => {
  return (
    <ModalView BoxComponent={CalendarBoxContent} {...others}>
      {children}
    </ModalView>
  )
}