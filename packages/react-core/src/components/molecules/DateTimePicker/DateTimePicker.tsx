import { format as formatDate } from 'date-fns';
import * as React from 'react';
import { ModalBaseProps } from 'react-native';
import { InputContainerProps, useInputFocus } from '../../atoms/Input';
import { Text, TextProps } from '../../atoms/Text';
import { CalendarIcon, getStyledTextComponent } from '../DatePicker/styled';
import { DateTimeSelectorProps } from '../DateTimeSelector';
import { DateTimePickerModalProps, Modal } from './Modal';
import { HintInputContainer } from '../HintInputContainer';

export interface DateTimePickerProps
  extends InputContainerProps,
    DateTimePickerModalProps,
    Omit<DateTimeSelectorProps, 'style'> {
  controlComponent?: (
    onPress: () => void,
    displayValue?: string
  ) => JSX.Element;
  TextComponent?: React.FC<TextProps>;
  animationType?: ModalBaseProps['animationType'];
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
  controlComponent,
  hintComponent,
  hint,
  variant = 'default',
  TextComponent = Text,
  DateTimeSelectorComponent,
  bottomOffset,
  rightComponent,
  animationType = 'fade',
  style,
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

  const StyledText = getStyledTextComponent(TextComponent);
  const displayValue =
    (value ? formatDate(value, format, { locale: locale }) : placeholder) ||
    ' ';

  return (
    <>
      {controlComponent ? (
        controlComponent(handlePressInput, displayValue)
      ) : (
        <HintInputContainer
          focused={focused}
          viewStyle={style}
          onPress={handlePressInput}
          disabled={disabled}
          LabelComponent={TextComponent}
          variant={variant}
          hint={hint}
          hintComponent={hintComponent}
          rightComponent={
            <>
              <CalendarIcon name="calendar-sharp" type="ionicon" size="centi" />
              {rightComponent}
            </>
          }
          {...rest}
        >
          <StyledText fontWeight="bold" disabled={disabled}>
            {displayValue}
          </StyledText>
        </HintInputContainer>
      )}
      <Modal
        DateTimeSelectorComponent={DateTimeSelectorComponent}
        bottomOffset={bottomOffset}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
        animated
        animationType={animationType}
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
