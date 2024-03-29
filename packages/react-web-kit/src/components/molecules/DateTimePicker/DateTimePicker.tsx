import {
  ControlledDateTimeSelector,
  DateTimePicker as DateTimePickerCore,
  DateTimePickerProps,
} from '@tecsinapse/react-core';
import React, { FC, useCallback, useState } from 'react';
import { Dropdown } from '../../atoms/Dropdown';
import { DateTimePickerSelector } from '../DateTimePickerSelector';

export type WebDateTimePickerProps = Omit<
  DateTimePickerProps,
  'renderSelector' | 'requestShowSelector' | 'requestCloseSelector'
>;

export const DateTimePicker: FC<WebDateTimePickerProps> = ({ ...rest }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const show = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  return (
    <DateTimePickerCore
      {...rest}
      DateTimeSelectorComponent={props => (
        <ControlledDateTimeSelector
          SelectorComponent={DateTimePickerSelector}
          {...props}
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
