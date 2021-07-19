import * as React from 'react';
import { Modal as RNModal, ModalProps } from 'react-native';
import {
  DateTimeSelector,
  DateTimeSelectorProps,
} from '@tecsinapse/react-core';
import { Backdrop, ModalContent } from './styled';

const Component = ({
  value,
  onRequestClose,
  onChange,
  mode,
  format,
  ...modalProps
}: DateTimeSelectorProps & ModalProps) => {
  return (
    <RNModal
      {...modalProps}
      animationType={'fade'}
      transparent
      onRequestClose={onRequestClose}
    >
      <Backdrop onPress={onRequestClose}>
        <ModalContent>
          <DateTimeSelector
            value={value}
            onChange={onChange}
            mode={mode}
            format={format}
          />
        </ModalContent>
      </Backdrop>
    </RNModal>
  );
};

export const Modal = Component;
