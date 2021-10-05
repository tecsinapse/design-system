import * as React from 'react';
import { Modal as RNModal, ModalProps } from 'react-native';
import { Calendar, CalendarProps, SelectionType } from '../Calendar';
import { Backdrop, ModalContent } from './styled';

export interface DatePickerModalProps<T extends SelectionType> {
  CalendarComponent?: React.FC<CalendarProps<T>>;
  bottomOffset?: number;
}

const Component = <T extends SelectionType>({
  type,
  value,
  onRequestClose,
  month,
  year,
  onChange,
  CalendarComponent = Calendar,
  bottomOffset = 0,
  locale,
  ...modalProps
}: CalendarProps<T> & ModalProps & DatePickerModalProps<T>): JSX.Element => {
  return (
    <RNModal
      transparent
      hardwareAccelerated
      statusBarTranslucent
      {...modalProps}
      onRequestClose={onRequestClose}
    >
      <Backdrop onPress={onRequestClose} effect="none">
        <ModalContent offset={bottomOffset}>
          <CalendarComponent
            pointerEvents={'box-none'}
            type={type}
            value={value}
            month={month}
            year={year}
            onChange={onChange}
            locale={locale}
          />
        </ModalContent>
      </Backdrop>
    </RNModal>
  );
};

export const Modal = Component;
