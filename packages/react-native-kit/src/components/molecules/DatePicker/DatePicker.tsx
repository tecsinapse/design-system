import {
  DatePicker as DatePickerCore,
  DatePickerProps,
  DateRange,
  SelectionType,
  Value,
} from '@tecsinapse/react-core';
import React, { FC, useMemo } from 'react';
import { getLocale } from '../../../utils/date';
import { IBaseModal, ModalView, useLazyModalManager } from '../../atoms/Modal';
import { Text } from '../../atoms/Text';
import { Calendar } from '../Calendar';
import { CalendarBoxContent } from './styled';

export type NativeDatePickerProps<T extends SelectionType> = Omit<
  DatePickerProps<T>,
  | 'CalendarComponent'
  | 'renderCalendar'
  | 'requestCloseCalendar'
  | 'requestShowCalendar'
>;

export const DatePicker = <T extends SelectionType>({
  locale,
  onChange,
  value,
  type,
  ...rest
}: NativeDatePickerProps<T>): JSX.Element => {
  const modal = useLazyModalManager();

  const handleChange = (value?: Value<T>) => {
    onChange?.(value);
    modal.requestUpdate();
  };

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
      value={value}
      month={getMonth}
      year={getYear}
      type={type}
      TextComponent={Text}
      CalendarComponent={Calendar}
      locale={locale ?? getLocale()}
      onChange={handleChange}
      requestShowCalendar={modal.show}
      requestCloseCalendar={modal.close}
      renderCalendar={(calendar, blur) =>
        modal.sync(<NativeModal onClose={blur}>{calendar}</NativeModal>)
      }
    />
  );
};

const NativeModal: FC<IBaseModal> = ({ children, ...others }) => {
  return (
    <ModalView BoxComponent={CalendarBoxContent} {...others}>
      {children}
    </ModalView>
  );
};
