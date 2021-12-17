import {
  DatePicker as DatePickerCore,
  DatePickerProps,
  SelectionType,
} from '@tecsinapse/react-core';
import React from 'react';
import { Text } from '../../atoms/Text';
import { Calendar } from '../Calendar';
import { getLocale } from '../../../utils/date';

export const DatePicker = <T extends SelectionType>({
  locale,
  ...rest
}): JSX.Element => {
  return (
    <DatePickerCore
      {...rest}
      TextComponent={Text}
      CalendarComponent={Calendar}
      animationType="slide"
      locale={locale ?? getLocale()}
    />
  );
};
