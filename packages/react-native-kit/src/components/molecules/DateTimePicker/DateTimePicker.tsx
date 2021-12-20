import {
  DateTimePicker as DateTimePickerCore,
  DateTimePickerProps,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { Text } from '../../atoms/Text';
import { DateTimeSelector } from '../DateTimeSelector';
import { getLocale } from '../../../utils/date';

export const DateTimePicker: FC<DateTimePickerProps> = ({
  locale,
  ...rest
}) => {
  return (
    <DateTimePickerCore
      {...rest}
      TextComponent={Text}
      DateTimeSelectorComponent={DateTimeSelector}
      animationType="slide"
      locale={locale ?? getLocale()}
    />
  );
};
