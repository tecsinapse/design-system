import { format as formatDate } from 'date-fns';
import * as React from 'react';
import {
  PressableInputContainer,
  PressableInputContainerProps,
  useInputFocus,
} from '../../atoms/Input';
import { PressableSurfaceProps } from '../../atoms/PressableSurface';
import { Text } from '../../atoms/Text';
import { DateTimeSelectorProps } from '../DateTimeSelector';
import { Modal } from './Modal';

export interface DateTimePickerProps
  extends PressableInputContainerProps,
    Omit<DateTimeSelectorProps, 'style'> {
  PressableElement?: React.FC<PressableSurfaceProps>;
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

  placeholder,
  onFocus,
  onBlur,
  disabled,
  PressableElement,
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
      {PressableElement ? (
        <PressableElement onPress={handlePressInput} />
      ) : (
        <PressableInputContainer
          onPress={handlePressInput}
          focused={focused}
          disabled={disabled}
          {...rest}
        >
          <Text>{value ? formatDate(value, format) : placeholder}</Text>
        </PressableInputContainer>
      )}
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
      />
    </>
  );
};

export default DateTimePicker;
