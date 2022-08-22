import {
  CalendarProps,
  PressableSurface,
  SelectionType,
} from '@tecsinapse/react-core';
import * as React from 'react';
import { Modal as RNModal, ModalProps } from 'react-native';
import { Backdrop, ModalContent } from './styled';

const Component = <T extends SelectionType>({
  onRequestClose,
  children,
  ...modalProps
}: CalendarProps<T> & ModalProps & { children: JSX.Element }): JSX.Element => {
  return (
    <RNModal
      transparent
      hardwareAccelerated
      statusBarTranslucent
      {...modalProps}
      onRequestClose={onRequestClose}
    >
      <Backdrop onPress={onRequestClose} effect="none">
        <PressableSurface>
          <ModalContent>{children}</ModalContent>
        </PressableSurface>
      </Backdrop>
    </RNModal>
  );
};

export const Modal = Component;
