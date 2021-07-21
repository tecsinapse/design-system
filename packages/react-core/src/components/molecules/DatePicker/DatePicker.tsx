import * as React from 'react';
import { useInputFocus } from '../../atoms/Input';
import { CalendarProps, DateRange, SelectionType } from '../Calendar';
import { Text } from '../../atoms/Text';
import { Modal } from './Modal';
import { format as formatDate } from 'date-fns';
import {
  PressableInputContainer,
  PressableInputContainerProps,
} from '../../atoms/PressableInputContainer';

export interface DatePickerProps<T extends SelectionType>
  extends PressableInputContainerProps,
    Omit<CalendarProps<T>, 'style'> {
  placeholder?: string;
  onFocus?: () => void | never;
  onBlur?: () => void | never;
  format?: string;
}

function DatePicker<T extends SelectionType>({
  /** DatePicker props */
  month,
  year,
  onChange,
  value,
  type,
  format = 'yyyy-MM-dd',

  placeholder,
  onFocus,
  onBlur,
  disabled,
  ...rest
}: DatePickerProps<T>): JSX.Element {
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

  const getDisplayValue = () => {
    if (!value) return placeholder;
    if (type === 'day') {
      return formatDate(value as Date, format);
    } else {
      const { lowest, highest } = value as DateRange;
      if (highest)
        return `${formatDate(lowest, format)} - ${formatDate(highest, format)}`;
      else return formatDate(lowest, format);
    }
  };

  return (
    <>
      <PressableInputContainer
        onPress={handlePressInput}
        focused={focused}
        disabled={disabled}
        {...rest}
      >
        <Text>{getDisplayValue()}</Text>
      </PressableInputContainer>
      <Modal
        visible={modalVisible}
        onRequestClose={handleCloseModal}
        animated
        animationType={'slide'}
        month={month}
        year={year}
        onChange={onChange}
        value={value}
        type={type}
      />
    </>
  );
}

export default DatePicker;
