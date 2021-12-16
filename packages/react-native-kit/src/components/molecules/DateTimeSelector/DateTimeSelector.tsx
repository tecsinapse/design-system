import {
  DateTimeSelector as DateTimeSelectorCore,
  DateTimeSelectorProps,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { Text } from '../../atoms/Text';
import { getLocale } from '../../../utils/dateUtils';

export const DateTimeSelector: FC<DateTimeSelectorProps> = props => {
  return (
    <DateTimeSelectorCore
      {...props}
      TextComponent={Text}
      locale={props.locale ?? getLocale()}
    />
  );
};
