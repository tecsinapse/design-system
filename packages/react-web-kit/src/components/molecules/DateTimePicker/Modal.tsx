import { DateTimeSelectorProps } from '@tecsinapse/react-core';
import * as React from 'react';
import { Modal as RNModal, ModalProps } from 'react-native';
import { Backdrop, ModalContent } from './styled';

const Component: React.FC<DateTimeSelectorProps & ModalProps> = ({
  onRequestClose,
  onChange,
  children,
  ...rest
}) => {

  return (
    <RNModal
      transparent
      hardwareAccelerated
      statusBarTranslucent
      {...rest}
      onRequestClose={onRequestClose}
    >
      <Backdrop onPress={onRequestClose} effect="none">
        <ModalContent>
          {children}
        </ModalContent>
      </Backdrop>
    </RNModal>
  );
};

export const Modal = Component;
