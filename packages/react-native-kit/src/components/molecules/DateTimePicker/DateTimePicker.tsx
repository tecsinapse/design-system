import {
  DateTimePicker as DateTimePickerCore,
  DateTimePickerProps,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { Text } from '../../atoms/Text';
import { DateTimeSelector } from '../DateTimeSelector';
import { getLocale } from '../../../utils/dateUtils';

export const DateTimePicker: FC<DateTimePickerProps> = props => {
  return (
    <DateTimePickerCore
      {...props}
      TextComponent={Text}
      DateTimeSelectorComponent={DateTimeSelector}
      animationType="slide"
      locale={props.locale || getLocale()}
    />
  );
};
