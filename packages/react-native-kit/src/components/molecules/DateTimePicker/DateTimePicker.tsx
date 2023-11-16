import {
  DateTimePicker as DateTimePickerCore,
  DateTimePickerProps,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { getLocale } from '../../../utils/date';
import { IBaseModal, ModalView, useLazyModalManager } from '../../atoms/Modal';
import { Text } from '../../atoms/Text';
import { NewDateTimeSelector } from '../NewDateTimeSelector';

export type NativeDateTimePickerProps = Omit<
  DateTimePickerProps,
  | 'DateTimeSelectorComponent'
  | 'renderSelector'
  | 'requestCloseSelector'
  | 'requestShowSelector'
>;

export const DateTimePicker: FC<NativeDateTimePickerProps> = ({
  locale,
  onChange,
  value,
  hourLabel,
  minuteLabel,
  ...rest
}) => {
  const modal = useLazyModalManager();

  return (
    <DateTimePickerCore
      TextComponent={Text}
      DateTimeSelectorComponent={props => (
        <NewDateTimeSelector
          {...props}
          hourLabel={hourLabel}
          minuteLabel={minuteLabel}
        />
      )}
      locale={locale ?? getLocale()}
      requestShowSelector={() => modal.show()}
      requestCloseSelector={() => modal.close()}
      renderSelector={(selector, blur) =>
        modal.sync(<NativeModal onClose={blur}>{selector}</NativeModal>)
      }
      onChange={onChange}
      value={value}
      {...rest}
    />
  );
};

const NativeModal: FC<IBaseModal> = ({ children, ...others }) => {
  return <ModalView {...others}>{children}</ModalView>;
};
