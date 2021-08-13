import {
  DateTimePicker as DateTimePickerCore,
  DateTimePickerProps,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { Text } from '../../atoms/Text';

export const DateTimePicker: FC<DateTimePickerProps> = props => {
  return <DateTimePickerCore {...props} TextComponent={Text} />;
};
