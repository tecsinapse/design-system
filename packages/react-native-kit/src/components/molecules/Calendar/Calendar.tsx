import {
  Calendar as CalendarCore,
  CalendarProps,
  SelectionType,
} from '@tecsinapse/react-core';
import React from 'react';
import { Text } from '../../atoms/Text';

export const Calendar = <T extends SelectionType>(
  props: CalendarProps<T>
): JSX.Element => {
  return <CalendarCore {...props} TextComponent={Text} />;
};
