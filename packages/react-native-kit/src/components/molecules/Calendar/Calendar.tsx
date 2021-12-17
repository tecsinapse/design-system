import {
  Calendar as CalendarCore,
  CalendarProps,
  SelectionType,
} from '@tecsinapse/react-core';
import React from 'react';
import { Text } from '../../atoms/Text';
import { getLocale } from '../../../utils/date';

export const Calendar = <T extends SelectionType>({
  locale,
  ...rest
}): JSX.Element => {
  return (
    <CalendarCore
      {...rest}
      TextComponent={Text}
      locale={locale ?? getLocale()}
    />
  );
};
