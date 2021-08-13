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
import { CalendarIcon, getStyledTextComponent } from '../DatePicker/styled';
import { DateTimeSelector, DateTimeSelectorProps } from '../DateTimeSelector';
import { Modal } from './Modal';

export interface DateTimePickerProps
  extends InputContainerProps,
    Omit<DateTimeSelectorProps, 'style'> {
  PressableElement?: React.FC<PressableSurfaceProps>;
  TextComponent?: React.FC<TextProps>;
  DateTimeSelectorComponent?: React.FC<DateTimeSelectorProps>;
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
  hintComponent,
  hint,
  variant = 'default',
  TextComponent = Text,
  DateTimeSelectorComponent = DateTimeSelector,
  rightComponent,
  style,
  ...rest
}) => {
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
              {(value ? formatDate(value, format) : placeholder) || ' '}
            </StyledText>
          </PressableInputContainer>
          {hint && _hint}
        </View>
      )}
      <Modal
        DateTimeSelectorComponent={DateTimeSelectorComponent}
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
