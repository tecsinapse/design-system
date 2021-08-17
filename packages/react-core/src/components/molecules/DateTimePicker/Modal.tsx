import * as React from 'react';
import { Modal as RNModal, ModalProps } from 'react-native';
import { DateTimeSelectorProps } from '../DateTimeSelector';
import { Backdrop, getStyledDateTimeSelector, ModalContent } from './styled';

const Component: React.FC<
  DateTimeSelectorProps &
    ModalProps & { DateTimeSelectorComponent: React.FC<DateTimeSelectorProps> }
> = ({
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
  DateTimeSelectorComponent,
  ...modalProps
}) => {
  const handleDateTimeSelectorChange = (date: Date) => {
    onChange?.(date);
    onRequestClose?.();
  };

  const StyledDateTimeSelector = getStyledDateTimeSelector(
    DateTimeSelectorComponent
  );

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
