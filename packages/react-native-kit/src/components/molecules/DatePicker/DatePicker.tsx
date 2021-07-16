import * as React from 'react';
import {
  CalendarProps,
  DateRange,
  InputContainer,
  InputContainerProps,
  SelectionType,
  useInputFocus,
} from '@tecsinapse/react-core';
import { Text } from '../../atoms/Text';
import { Modal } from './Modal';
import { format as formatDate } from 'date-fns';
import { StyledPressableSurface } from './styled';

export interface DatePickerProps<T extends SelectionType>
  extends Omit<InputContainerProps, 'value' | 'onChange' | 'onChangeText'>,
    CalendarProps<T> {
  placeholder?: string;
  onFocus?: () => void | never;
  onBlur?: () => void | never;
  format?: string;
}

function DatePicker<T extends SelectionType>({
  label,
  labelColor,
  labelColorVariant,
  labelColorTone,
  labelTypography,
  labelStack,
  labelWeight,
  leftComponent,
  rightComponent,
  style,
  borderColor,
  borderColorGradation,

  /** DatePicker props */
  month,
  year,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  value,
  type,
  disabled,
  format = 'yyyy-MM-dd',
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
      <StyledPressableSurface
        onPress={handlePressInput}
        disabled={disabled}
        style={style}
      >
        <InputContainer
          label={label}
          labelColor={labelColor}
          labelColorVariant={labelColorVariant}
          labelColorTone={labelColorTone}
          labelTypography={labelTypography}
          labelStack={labelStack}
          labelWeight={labelWeight}
          LabelComponent={Text}
          leftComponent={leftComponent}
          rightComponent={rightComponent}
          borderColor={borderColor}
          borderColorGradation={borderColorGradation}
          focused={focused}
          disabled={disabled}
          {...rest}
        >
          <Text>{getDisplayValue()}</Text>
        </InputContainer>
      </StyledPressableSurface>
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
