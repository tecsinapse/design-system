import * as React from 'react';
import { Modal as RNModal, ModalProps } from 'react-native';
import { Calendar, CalendarProps, SelectionType } from '../Calendar';
import { Backdrop, ModalContent } from './styled';

const Component = <T extends SelectionType>({
  type,
  value,
  onRequestClose,
  month,
  year,
  onChange,
  ...modalProps
}: CalendarProps<T> & ModalProps) => {
  return (
    <RNModal
      {...modalProps}
      animationType={'fade'}
      transparent
      onRequestClose={onRequestClose}
    >
      <Backdrop onPress={onRequestClose}>
        <ModalContent>
          <Calendar
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
