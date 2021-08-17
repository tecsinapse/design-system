import {
  DateTimeSelector as DateTimeSelectorCore,
  DateTimeSelectorProps,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { Text } from '../../atoms/Text';

export const DateTimeSelector: FC<DateTimeSelectorProps> = props => {
  return <DateTimeSelectorCore {...props} TextComponent={Text} />;
};
