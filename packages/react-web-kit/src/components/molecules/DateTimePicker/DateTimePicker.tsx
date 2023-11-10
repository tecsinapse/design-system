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
  value,
  onChange,
  ...rest
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  console.log('DateTimePicker - value:', value);
  console.log('DateTimePicker - onChange:', onChange);

  const show = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  return (
    <DateTimePickerCore
      {...rest}
      value={value}
      DateTimeSelectorComponent={props => (
        <InputWebDate {...props} value={value} onChange={onChange} />
      )}
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
