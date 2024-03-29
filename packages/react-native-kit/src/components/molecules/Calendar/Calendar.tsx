import {
  Calendar as CalendarCore,
  CalendarProps,
  SelectionType,
} from '@tecsinapse/react-core';
import React from 'react';
import { getLocale } from '../../../utils/date';
import { Text } from '../../atoms/Text';

export const Calendar = <T extends SelectionType>({
  locale,
  ...rest
}: CalendarProps<T>): JSX.Element => {
  return (
    <CalendarCore
      {...rest}
      TextComponent={Text}
      locale={locale ?? getLocale()}
    />
  );
};
