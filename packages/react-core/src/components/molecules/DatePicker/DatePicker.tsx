import { format as formatDate } from 'date-fns';
import * as React from 'react';
import { ModalBaseProps } from 'react-native';
import { InputContainerProps, useInputFocus } from '../../atoms/Input';
import { Text, TextProps } from '../../atoms/Text';
import { CalendarProps, DateRange, SelectionType } from '../Calendar';
import { DatePickerModalProps, Modal } from './Modal';
import { CalendarIcon, getStyledTextComponent } from './styled';
import { HintInputContainer } from '../HintInputContainer';
import { useEffect } from 'react';

export interface DatePickerProps<T extends SelectionType>
  extends InputContainerProps,
    DatePickerModalProps<T>,
    Omit<CalendarProps<T>, 'style'> {
  controlComponent?: (
    onPress: () => void,
    displayValue?: string
  ) => JSX.Element;
  TextComponent?: React.FC<TextProps>;
  animationType?: ModalBaseProps['animationType'];
  placeholder?: string;
  onFocus?: () => void | never;
  onBlur?: () => void | never;
  format?: string;
  closeOnPick?: boolean;
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
  controlComponent,
  hintComponent,
  hint,
  variant,
  TextComponent = Text,
  CalendarComponent,
  bottomOffset,
  rightComponent,
  animationType = 'fade',
  style,
  locale,
  closeOnPick = false,
  ...rest
}: DatePickerProps<T>): JSX.Element {
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );

  const [modalVisible, setModalVisible] = React.useState(false);

  const handlePressInput = React.useCallback(() => {
    setModalVisible(true);
    handleFocus();
  }, [handleFocus, setModalVisible]);

  const handleCloseModal = React.useCallback(() => {
    setModalVisible(false);
    handleBlur();
  }, [handleBlur, setModalVisible]);

  const getDisplayValue = () => {
    if (!value) return placeholder;
    if (type === 'day') {
      return formatDate(value as Date, format, { locale: locale });
    } else {
      const { lowest, highest } = value as DateRange;
      if (highest)
        return `${formatDate(lowest, format, {
          locale: locale,
        })} - ${formatDate(highest, format, { locale: locale })}`;
      else return formatDate(lowest, format, { locale: locale });
    }
  };

  const StyledText = getStyledTextComponent(TextComponent);

  useEffect(() => {
    if (closeOnPick && value && type === 'day') {
      setTimeout(handleCloseModal, 200);
    }
    if (closeOnPick && value && type === 'range') {
      const { lowest, highest } = value as DateRange;
      lowest && highest && setTimeout(handleCloseModal, 200);
    }
  }, [value, closeOnPick, type, handleCloseModal]);

  return (
    <>
      {controlComponent ? (
        controlComponent(handlePressInput, getDisplayValue())
      ) : (
        <HintInputContainer
          focused={focused}
          viewStyle={style}
          onPress={handlePressInput}
          disabled={disabled}
          hintComponent={hintComponent}
          LabelComponent={TextComponent}
          variant={variant}
          hint={hint}
          rightComponent={
            <>
              <CalendarIcon name="calendar-sharp" type="ionicon" size="centi" />
              {rightComponent}
            </>
          }
          {...rest}
        >
          <StyledText fontWeight="bold" disabled={disabled}>
            {getDisplayValue() || ' '}
          </StyledText>
        </HintInputContainer>
      )}
      <Modal
        CalendarComponent={CalendarComponent}
        bottomOffset={bottomOffset}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
        animated
        animationType={animationType}
        month={month}
        year={year}
        onChange={onChange}
        value={value}
        type={type}
        locale={locale}
      />
    </>
  );
}

export default DatePicker;
