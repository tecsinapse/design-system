import * as React from 'react';
import {
  PressableInputContainer,
  PressableInputContainerProps,
} from '../../atoms/PressableInputContainer';
import { Text } from '../../atoms/Text';
import { format as formatDate } from 'date-fns';
import { Modal } from './Modal';
import { useInputFocus } from '@tecsinapse/react-core';

export interface DateTimePickerProps extends PressableInputContainerProps {
  onChange?: (value: Date) => void | never;
  value?: Date;
  mode?: 'date' | 'time' | 'datetime';
  format?: string;
  locale?: Locale;
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
      />
    </>
  );
};

export default DateTimePicker;
