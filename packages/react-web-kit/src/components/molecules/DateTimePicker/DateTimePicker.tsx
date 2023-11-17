import {
  DateTimePicker as DateTimePickerCore,
  DateTimePickerProps,
} from '@tecsinapse/react-core';
import React, { FC, useCallback, useState } from 'react';
import { Dropdown } from '../../atoms/Dropdown';
import { InputWebDate } from '../InputWebDate';

export type WebDateTimePickerProps = Omit<
  DateTimePickerProps,
  'renderSelector' | 'requestShowSelector' | 'requestCloseSelector'
>;

export const DateTimePicker: FC<WebDateTimePickerProps> = ({
  locale,
  ...rest
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const show = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  return (
    <DateTimePickerCore
      {...rest}
      DateTimeSelectorComponent={InputWebDate}
      requestShowSelector={show}
      requestCloseSelector={close}
      renderSelector={selector => (
        <Dropdown visible={visible} setVisible={setVisible}>
          {selector}
        </Dropdown>
      )}
    />
  );
};
