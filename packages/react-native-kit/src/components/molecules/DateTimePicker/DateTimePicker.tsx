import {
  DateTimePicker as DateTimePickerCore,
  DateTimePickerProps
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { getLocale } from '../../../utils/date';
import { IBaseModal, ModalView, useLazyModalManager } from '../../atoms/Modal';
import { Text } from '../../atoms/Text';
import { DateTimeSelector } from '../DateTimeSelector';

export const DateTimePicker: FC<Omit<DateTimePickerProps, 'DateTimeSelectorComponent' | 'renderSelector' | 'requestCloseSelector' | 'requestShowSelector'>> = ({ locale, ...rest }) => {

  const modal = useLazyModalManager()

  return (
    <DateTimePickerCore
      {...rest}
      TextComponent={Text}
      DateTimeSelectorComponent={DateTimeSelector}
      locale={locale ?? getLocale()}
      requestShowSelector={() => modal.show()}
      requestCloseSelector={() => modal.close()}
      renderSelector={(selector, blur) => modal.sync(
        <NativeModal onClose={blur}>
          {selector}
        </NativeModal>
      )}
    />
  );
};

const NativeModal: FC<IBaseModal> = ({ children, ...others }) => {
  return (
    <ModalView {...others}>
      {children}
    </ModalView>
  )
}