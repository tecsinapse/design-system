import {
  DatePicker as DatePickerCore,
  DatePickerProps,
  SelectionType,
} from '@tecsinapse/react-core';
import React from 'react';
import { Text } from '../../atoms/Text';

export const DatePicker = <T extends SelectionType>(
  props: DatePickerProps<T>
): JSX.Element => {
  return <DatePickerCore {...props} TextComponent={Text} />;
};
