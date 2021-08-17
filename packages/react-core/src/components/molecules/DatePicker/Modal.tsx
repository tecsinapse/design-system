import * as React from 'react';
import { Modal as RNModal, ModalProps } from 'react-native';
import { CalendarProps, SelectionType } from '../Calendar';
import { Backdrop, ModalContent } from './styled';

const Component = <T extends SelectionType>({
  type,
  value,
  onRequestClose,
  month,
  year,
  onChange,
  CalendarComponent,
  ...modalProps
}: CalendarProps<T> &
  ModalProps & { CalendarComponent: React.FC<CalendarProps<T>> }) => {
  return (
    <RNModal
      transparent
      hardwareAccelerated
      statusBarTranslucent
      {...modalProps}
      onRequestClose={onRequestClose}
    >
      <Backdrop onPress={onRequestClose} effect="none">
        <ModalContent>
          <CalendarComponent
            pointerEvents={'box-none'}
            type={type}
            value={value}
            month={month}
            year={year}
            onChange={onChange}
          />
        </ModalContent>
      </Backdrop>
    </RNModal>
  );
};

export const Modal = Component;
