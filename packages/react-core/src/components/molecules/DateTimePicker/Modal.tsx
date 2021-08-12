import * as React from 'react';
import { Modal as RNModal, ModalProps } from 'react-native';
import { DateTimeSelectorProps } from '../DateTimeSelector';
import { Backdrop, ModalContent, StyledDateTimeSelector } from './styled';

const Component: React.FC<DateTimeSelectorProps & ModalProps> = ({
  onRequestClose,
  onChange,
  value,
  mode,
  format,
  locale,
  upperDateThreshold,
  lowerDateThreshold,
  offsetThreshold,
  upperOffsetThreshold,
  lowerOffsetThreshold,
  dateModalTitle,
  timeModalTitle,
  dateConfirmButtonText,
  timeConfirmButtonText,
  dayLabel,
  monthLabel,
  yearLabel,
  hourLabel,
  minuteLabel,
  ...modalProps
}) => {
  const handleDateTimeSelectorChange = (date: Date) => {
    onChange?.(date);
    onRequestClose?.();
  };
  return (
    <RNModal
      transparent
      hardwareAccelerated
      animationType={'slide'}
      {...modalProps}
      onRequestClose={onRequestClose}
    >
      <Backdrop onPress={onRequestClose}>
        <ModalContent>
          <StyledDateTimeSelector
            value={value}
            mode={mode}
            format={format}
            locale={locale}
            upperDateThreshold={upperDateThreshold}
            lowerDateThreshold={lowerDateThreshold}
            offsetThreshold={offsetThreshold}
            upperOffsetThreshold={upperOffsetThreshold}
            lowerOffsetThreshold={lowerOffsetThreshold}
            dateModalTitle={dateModalTitle}
            timeModalTitle={timeModalTitle}
            dateConfirmButtonText={dateConfirmButtonText}
            timeConfirmButtonText={timeConfirmButtonText}
            dayLabel={dayLabel}
            monthLabel={monthLabel}
            yearLabel={yearLabel}
            hourLabel={hourLabel}
            minuteLabel={minuteLabel}
            onChange={handleDateTimeSelectorChange}
          />
        </ModalContent>
      </Backdrop>
    </RNModal>
  );
};

export const Modal = Component;
