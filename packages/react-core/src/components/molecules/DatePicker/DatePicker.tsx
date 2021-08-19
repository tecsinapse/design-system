import { format as formatDate } from 'date-fns';
import * as React from 'react';
import { ModalBaseProps, View } from 'react-native';
import {
  Hint,
  InputContainerProps,
  PressableInputContainer,
  useInputFocus,
} from '../../atoms/Input';
import { Text, TextProps } from '../../atoms/Text';
import { CalendarProps, DateRange, SelectionType } from '../Calendar';
import { DatePickerModalProps, Modal } from './Modal';
import { CalendarIcon, getStyledTextComponent } from './styled';

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
  variant = 'default',
  TextComponent = Text,
  CalendarComponent,
  bottomOffset,
  rightComponent,
  animationType = 'fade',
  style,
  ...rest
}: DatePickerProps<T>): JSX.Element {
  const _hint = hintComponent || (
    <Hint TextComponent={TextComponent} text={hint} variant={variant} />
  );

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

  const StyledText = getStyledTextComponent(TextComponent);

  return (
    <>
      {controlComponent ? (
        controlComponent(handlePressInput, getDisplayValue())
      ) : (
        <View style={style}>
          <PressableInputContainer
            onPress={handlePressInput}
            focused={focused}
            disabled={disabled}
            LabelComponent={TextComponent}
            variant={variant}
            rightComponent={
              <>
                <CalendarIcon
                  name="calendar-sharp"
                  type="ionicon"
                  size="centi"
                />
                {rightComponent}
              </>
            }
            {...rest}
          >
            <StyledText fontWeight="bold" disabled={disabled}>
              {getDisplayValue() || ' '}
            </StyledText>
          </PressableInputContainer>
          {hint && _hint}
        </View>
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
      />
    </>
  );
}

export default DatePicker;
