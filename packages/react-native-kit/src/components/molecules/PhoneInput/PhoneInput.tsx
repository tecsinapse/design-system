import {
  PhoneInput as PhoneInputCore,
  PhoneInputProps,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { IBaseModal, ModalView, useLazyModalManager } from '../../atoms/Modal';
import { Text } from '../../atoms/Text';
import { PhoneCountryPickerSelector } from '../PhoneCountryPickerSelector';
import { FlagIcon } from './FlagIcon';

export type NativePhoneInputProps = Omit<
  PhoneInputProps,
  | 'renderCountrySelector'
  | 'requestShowCountrySelector'
  | 'requestCloseCountrySelector'
  | 'CountrySelectorComponent'
  | 'FlagComponent'
  | 'TextComponent'
> & {
  countryModalTitle?: string;
};

export const PhoneInput: FC<NativePhoneInputProps> = ({
  countryModalTitle,
  onChange,
  ...rest
}) => {
  const modal = useLazyModalManager();

  return (
    <PhoneInputCore
      {...rest}
      onChange={(...args) => {
        onChange?.(...args);
        modal.requestUpdate();
      }}
      TextComponent={Text}
      FlagComponent={FlagIcon}
      CountrySelectorComponent={props => (
        <PhoneCountryPickerSelector
          title={countryModalTitle}
          onClose={modal.close}
          {...props}
        />
      )}
      requestShowCountrySelector={() => {
        modal.show();
        modal.requestUpdate();
      }}
      requestCloseCountrySelector={modal.close}
      renderCountrySelector={(selector, blur) =>
        modal.sync(<NativeModal onClose={blur}>{selector}</NativeModal>)
      }
    />
  );
};

const NativeModal: FC<IBaseModal> = ({ children, ...others }) => {
  return <ModalView {...others}>{children}</ModalView>;
};
