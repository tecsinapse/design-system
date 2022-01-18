import { format as formatDate } from 'date-fns';
import * as React from 'react';
import { InputContainerProps, useInputFocus } from '../../atoms/Input';
import { Text, TextProps } from '../../atoms/Text';
import { CalendarIcon, getStyledTextComponent } from '../DatePicker/styled';
import { DateTimeSelector, DateTimeSelectorProps } from '../DateTimeSelector';
import { HintInputContainer } from '../HintInputContainer';
import { getStyledDateTimeSelector } from './styled';

export interface DateTimePickerProps extends InputContainerProps, Omit<DateTimeSelectorProps, 'style'> {
  controlComponent?: (
    onPress: () => void,
    displayValue?: string
  ) => JSX.Element;
  TextComponent?: React.FC<TextProps>;
  DateTimeSelectorComponent: React.FC<DateTimeSelectorProps>;
  placeholder?: string;
  onFocus?: () => void | never;
  onBlur?: () => void | never;
  renderSelector: (selector: React.ReactElement, blur?: () => void) => JSX.Element|null
  requestShowSelector: () => void
  requestCloseSelector: () => void
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
  DateTimeSelectorComponent = DateTimeSelector,
  rightComponent,
  style,
  renderSelector,
  requestShowSelector,
  requestCloseSelector,
  ...rest
}) => {
  
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );

  const handleShowSelector = () => {
    requestShowSelector()
    handleFocus();
  };

  const handleChoosing = (value: Date) => {
    onChange?.(value)
    requestCloseSelector()
  };

  const StyledText = getStyledTextComponent(TextComponent);
  const displayValue = (value ? formatDate(value, format, { locale: locale }) : placeholder) || ' ';
  const StyledDateTimeSelector = getStyledDateTimeSelector(DateTimeSelectorComponent)

  const dateTimeSelector = (
    <StyledDateTimeSelector
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
      onChange={handleChoosing}
    />
  )

  return (
    <>
      {controlComponent ? (
        controlComponent(handleShowSelector, displayValue)
      ) : (
        <HintInputContainer
          focused={focused}
          viewStyle={style}
          onPress={handleShowSelector}
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
      {renderSelector(dateTimeSelector, handleBlur)}
    </>
  );
};

export default DateTimePicker;
