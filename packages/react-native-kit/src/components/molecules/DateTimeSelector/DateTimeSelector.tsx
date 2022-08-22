import {
  DateTimeSelector as DateTimeSelectorCore,
  DateTimeSelectorProps,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { Text } from '../../atoms/Text';
import { getLocale } from '../../../utils/date';

export const DateTimeSelector: FC<DateTimeSelectorProps> = ({
  locale,
  ...rest
}) => {
  return (
    <DateTimeSelectorCore
      {...rest}
      TextComponent={Text}
      locale={locale ?? getLocale()}
    />
  );
};
