import { format as formatDate } from '@tecsinapse/cortex-core';
import type { Locale } from '@tecsinapse/cortex-core';
import * as React from 'react';
import { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../../atoms/Icon/Icon';
import Text, { TextProps } from '../../atoms/Text/Text';
import { useInputFocus } from '../../atoms/Input';
import HintInputContainer from '../HintInputContainer/HintInputContainer';
import DateTimePickerSelector from '../DateTimePickerSelector/DateTimePickerSelector';
import { InputVariantType } from '../../atoms/Input/InputContainer';

export type DateTimePickerMode = 'date' | 'time' | 'datetime' | 'month';

export interface DateTimePickerProps {
  value?: Date;
  onChange?: (value: Date) => void;
  mode?: DateTimePickerMode;
  format?: string;
  locale?: Locale;
  placeholder?: string;
  disabled?: boolean;
  variant?: InputVariantType;
  hint?: string;
  hintComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  label?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  TextComponent?: React.FC<TextProps>;
  /** @deprecated No longer rendered — kept for backward compatibility. */
  dateModalTitle?: string;
  /** @deprecated No longer rendered — kept for backward compatibility. */
  timeModalTitle?: string;
  dateConfirmButtonText?: string;
  timeConfirmButtonText?: string;
  monthLabel?: string;
  yearLabel?: string;
  hourLabel?: string;
  minuteLabel?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onChange,
  value,
  mode = 'date',
  format = 'yyyy-MM-dd hh:mm:ss',
  locale,
  // dateModalTitle/timeModalTitle are accepted for API compatibility but no
  // longer render — the title bar was removed from the selector.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dateModalTitle: _dateModalTitle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  timeModalTitle: _timeModalTitle,
  dateConfirmButtonText,
  timeConfirmButtonText,
  monthLabel,
  yearLabel,
  hourLabel,
  minuteLabel,
  placeholder,
  onFocus,
  onBlur,
  disabled,
  variant = 'default',
  TextComponent = Text,
  rightComponent,
  hintComponent,
  hint,
  label,
}) => {
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState<Date>(value || new Date());
  const [currentMode, setCurrentMode] = useState<0 | 1>(0);
  const { bottom } = useSafeAreaInsets();

  const handleShowSelector = () => {
    handleFocus();
    setModalVisible(true);
  };

  const handleCloseSelector = () => {
    handleBlur();
    setModalVisible(false);
  };

  const isDate = mode === 'date' || (mode === 'datetime' && currentMode === 0);
  const isMonth = mode === 'month';

  const confirmButtonText =
    isDate || isMonth ? dateConfirmButtonText : timeConfirmButtonText;

  const handleCalendarChange = (value?: Date) => {
    if (value !== undefined) {
      const referenceDate = value;
      referenceDate.setHours(date.getHours(), date.getMinutes());
      setDate(referenceDate);
    }
  };

  const handlePressConfirm = () => {
    if (mode === 'datetime' && currentMode === 0) {
      setCurrentMode(1);
    } else {
      onChange?.(date);
      handleCloseSelector();
    }
  };

  const handlePressBack = () => {
    setCurrentMode(0);
  };

  const displayValue =
    (value ? formatDate(value, format, { locale: locale }) : placeholder) ||
    ' ';

  return (
    <>
      <HintInputContainer
        onPress={handleShowSelector}
        focused={focused}
        disabled={disabled}
        LabelComponent={TextComponent}
        variant={variant}
        hint={hint}
        hintComponent={hintComponent}
        label={label}
        rightComponent={
          <>
            <Icon name="calendar-sharp" type="ionicon" size="centi" />
            {rightComponent}
          </>
        }
      >
        <TextComponent fontWeight="bold" fontColor={disabled ? 'minimal' : 'high'}>
          {displayValue}
        </TextComponent>
      </HintInputContainer>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseSelector}
      >
        <Pressable
          testID="datetimepicker-backdrop"
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onPress={handleCloseSelector}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: bottom,
            }}
          >
            <Pressable onPress={event => event.stopPropagation()}>
              <View
                testID="datetimepicker-sheet"
                className="bg-surface-overlay rounded-t-deca overflow-hidden"
              >
                <DateTimePickerSelector
                  date={date}
                  setDate={setDate}
                  currentMode={currentMode}
                  isDate={isDate}
                  isMonth={isMonth}
                  handlePressConfirm={handlePressConfirm}
                  handlePressBack={handlePressBack}
                  handleCalendarChange={handleCalendarChange}
                  confirmButtonText={confirmButtonText}
                  TextComponent={TextComponent}
                  locale={locale}
                  monthLabel={monthLabel}
                  yearLabel={yearLabel}
                  hourLabel={hourLabel}
                  minuteLabel={minuteLabel}
                />
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default DateTimePicker;
