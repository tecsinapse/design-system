import { format as formatDate } from 'date-fns';
import * as React from 'react';
import { useEffect } from 'react';
import { InputContainerProps, useInputFocus } from '../../atoms/Input';
import { Text, TextProps } from '../../atoms/Text';
import { CalendarProps, DateRange, SelectionType } from '../Calendar';
import { HintInputContainer } from '../HintInputContainer';
import { CalendarIcon, getStyledTextComponent } from './styled';

export interface DatePickerProps<T extends SelectionType>
  extends InputContainerProps,
    Omit<CalendarProps<T>, 'style'> {
  controlComponent?: (
    onPress: () => void,
    displayValue?: string
  ) => JSX.Element;
  TextComponent?: React.FC<TextProps>;
  CalendarComponent: React.FC<CalendarProps<T>>;
  placeholder?: string;
  onFocus?: () => void | never;
  onBlur?: () => void | never;
  format?: string;
  closeOnPick?: boolean;
  renderCalendar: (
    calendar: React.ReactElement,
    blur?: () => void
  ) => JSX.Element | null;
  requestShowCalendar: () => void;
  requestCloseCalendar: () => void;
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
  rightComponent,
  style,
  locale,
  closeOnPick = false,
  renderCalendar,
  requestShowCalendar,
  requestCloseCalendar,
  ...rest
}: DatePickerProps<T>): JSX.Element {
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );

  const handleShowCalendar = React.useCallback(() => {
    requestShowCalendar();
    handleFocus();
  }, [handleFocus, requestShowCalendar]);

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
      setTimeout(requestCloseCalendar, 200);
    }
    if (closeOnPick && value && type === 'range') {
      const { lowest, highest } = value as DateRange;
      lowest && highest && setTimeout(requestCloseCalendar, 200);
    }
  }, [value, closeOnPick, type, requestCloseCalendar]);

  const calendar = (
    <CalendarComponent
      pointerEvents={'box-none'}
      type={type}
      value={value}
      month={month}
      year={year}
      onChange={onChange}
      locale={locale}
    />
  );

  return (
    <>
      {controlComponent ? (
        controlComponent(handleShowCalendar, getDisplayValue())
      ) : (
        <HintInputContainer
          focused={focused}
          viewStyle={style}
          onPress={handleShowCalendar}
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
      {renderCalendar(calendar, handleBlur)}
    </>
  );
}

export default DatePicker;
