import { format as formatDate } from 'date-fns';
import * as React from 'react';
import { View } from 'react-native';
import {
  Hint,
  InputContainerProps,
  PressableInputContainer,
  useInputFocus,
} from '../../atoms/Input';
import { PressableSurfaceProps } from '../../atoms/PressableSurface';
import { Text, TextProps } from '../../atoms/Text';
import { Calendar, CalendarProps, DateRange, SelectionType } from '../Calendar';
import { Modal } from './Modal';
import { CalendarIcon, getStyledTextComponent } from './styled';

export interface DatePickerProps<T extends SelectionType>
  extends InputContainerProps,
    Omit<CalendarProps<T>, 'style'> {
  PressableElement?: React.FC<PressableSurfaceProps>;
  TextComponent?: React.FC<TextProps>;
  CalendarComponent?: React.FC<CalendarProps<T>>;
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
  PressableElement,
  hintComponent,
  hint,
  variant = 'default',
  TextComponent = Text,
  CalendarComponent = Calendar,
  rightComponent,
  style,
  ...rest
}: DatePickerProps<T>): JSX.Element {
  const _hint = hintComponent || (
    <Hint TextComponent={Text} text={hint} variant={variant} />
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
      {PressableElement ? (
        <PressableElement onPress={handlePressInput} />
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
