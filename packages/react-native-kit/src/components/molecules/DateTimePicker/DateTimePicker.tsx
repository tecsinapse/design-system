import * as React from 'react';
import {
  PressableInputContainer,
  PressableInputContainerProps,
} from '../../atoms/PressableInputContainer';
import { Text } from '../../atoms/Text';
import { format as formatDate } from 'date-fns';
import { Modal } from './Modal';
import { DateTimeSelectorProps, useInputFocus } from '@tecsinapse/react-core';

export interface DateTimePickerProps
  extends PressableInputContainerProps,
    Omit<DateTimeSelectorProps, 'style'> {
  placeholder?: string;
  onFocus?: () => void | never;
  onBlur?: () => void | never;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onChange,
  value,
  mode = 'date',
  format = 'yyyy-MM-dd hh:mm:ss',
  locale,
  dateModalTitle,
  timeModalTitle,
  dateConfirmButtonText,
  timeConfirmButtonText,
  dayLabel,
  monthLabel,
  yearLabel,
  hourLabel,
  minuteLabel,

  placeholder,
  onFocus,
  onBlur,
  disabled,
  ...rest
}) => {
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );

  const [modalVisible, setModalVisible] = React.useState(false);

  const handlePressInput = () => {
    setModalVisible(true);
    handleFocus();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    handleBlur();
  };

  return (
    <>
      <PressableInputContainer
        onPress={handlePressInput}
        focused={focused}
        disabled={disabled}
        {...rest}
      >
        <Text>{value ? formatDate(value, format) : placeholder}</Text>
      </PressableInputContainer>
      <Modal
        visible={modalVisible}
        onRequestClose={handleCloseModal}
        animated
        animationType={'slide'}
        onChange={onChange}
        value={value}
        mode={mode}
        format={format}
        locale={locale}
        dateModalTitle={dateModalTitle}
        timeModalTitle={timeModalTitle}
        dateConfirmButtonText={dateConfirmButtonText}
        timeConfirmButtonText={timeConfirmButtonText}
        dayLabel={dayLabel}
        monthLabel={monthLabel}
        yearLabel={yearLabel}
        hourLabel={hourLabel}
        minuteLabel={minuteLabel}
      />
    </>
  );
};

export default DateTimePicker;
