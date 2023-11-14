import {
  DateTimePicker as DateTimePickerCore,
  DateTimePickerProps,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { getLocale } from '../../../utils/date';
import { IBaseModal, ModalView, useLazyModalManager } from '../../atoms/Modal';
import { Text } from '../../atoms/Text';
import ScrollableSelector from '../ScrollableSelector/ScrollableSelector';

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
      //@ts-ignore
      DateTimeSelectorComponent={
        <ScrollableSelector
          onChange={onChange}
          value={value}
          hourLabel={hourLabel}
          minuteLabel={minuteLabel}
        />
      }
      locale={locale ?? getLocale()}
      requestShowSelector={() => modal.show()}
      requestCloseSelector={() => modal.close()}
      renderSelector={(selector, blur) =>
        modal.sync(<NativeModal onClose={blur}>{selector}</NativeModal>)
      }
      {...rest}
    />
  );
};

const NativeModal: FC<IBaseModal> = ({ children, ...others }) => {
  return <ModalView {...others}>{children}</ModalView>;
};
