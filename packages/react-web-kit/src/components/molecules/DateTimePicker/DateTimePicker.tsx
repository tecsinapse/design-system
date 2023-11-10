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
  hourLabel,
  minuteLabel,
  ...rest
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const show = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  return (
    <DateTimePickerCore
      {...rest}
      value={value}
      DateTimeSelectorComponent={props => (
        <InputWebDate
          {...props}
          value={value}
          onChange={onChange}
          hourLabel={hourLabel}
          minuteLabel={minuteLabel}
          requestCloseSelector={close}
        />
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
