import { format as formatDate } from '@tecsinapse/cortex-core';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../../atoms/Icon/Icon';
import Text from '../../atoms/Text/Text';
import { useInputFocus } from '../../atoms/Input';
import HintInputContainer from '../HintInputContainer/HintInputContainer';
import Calendar from '../Calendar/Calendar';
import {
  CalendarProps,
  DateRange,
  SelectionType,
  Value,
} from '../Calendar';
import { InputVariantType } from '../../atoms/Input/InputContainer';

export interface DatePickerProps<T extends SelectionType>
  extends Omit<CalendarProps<T>, 'style' | 'onFocus' | 'onBlur'> {
  placeholder?: string;
  format?: string;
  closeOnPick?: boolean;
  disabled?: boolean;
  variant?: InputVariantType;
  hint?: string;
  hintComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  label?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

function DatePicker<T extends SelectionType>({
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
  hintComponent,
  hint,
  variant,
  TextComponent = Text,
  rightComponent,
  locale,
  closeOnPick = false,
  label,
}: DatePickerProps<T>): React.ReactElement {
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );
  const [modalVisible, setModalVisible] = useState(false);
  const { bottom } = useSafeAreaInsets();

  const handleShowCalendar = useCallback(() => {
    handleFocus();
    setModalVisible(true);
  }, [handleFocus]);

  const handleCloseCalendar = useCallback(() => {
    handleBlur();
    setModalVisible(false);
  }, [handleBlur]);

  const getDisplayValue = () => {
    if (!value) return placeholder;
    if (type === 'day') {
      return formatDate(value as Date, format, { locale: locale });
    } else {
      const { lowest, highest } = value as DateRange;
      if (highest && lowest) {
        return `${formatDate(lowest, format, {
          locale: locale,
        })} - ${formatDate(highest, format, { locale: locale })}`;
      } else return placeholder;
    }
  };

  const handleChange = useCallback(
    (newValue?: Value<T>) => {
      onChange?.(newValue);
      if (closeOnPick) {
        if (type === 'day' && newValue) {
          setTimeout(handleCloseCalendar, 200);
        }
        if (type === 'range' && newValue) {
          const { lowest, highest } = newValue as DateRange;
          if (lowest && highest) setTimeout(handleCloseCalendar, 200);
        }
      }
    },
    [onChange, closeOnPick, type, handleCloseCalendar]
  );

  useEffect(() => {
    if (closeOnPick && value && type === 'day') {
      setTimeout(handleCloseCalendar, 200);
    }
    if (closeOnPick && value && type === 'range') {
      const { lowest, highest } = value as DateRange;
      if (lowest && highest) setTimeout(handleCloseCalendar, 200);
    }
  }, [value, closeOnPick, type, handleCloseCalendar]);

  return (
    <>
      <HintInputContainer
        onPress={handleShowCalendar}
        focused={focused}
        disabled={disabled}
        hintComponent={hintComponent}
        LabelComponent={TextComponent}
        variant={variant}
        hint={hint}
        label={label}
        rightComponent={
          <>
            <Icon name="calendar-sharp" type="ionicon" size="centi" />
            {rightComponent}
          </>
        }
      >
        <TextComponent fontWeight="bold" fontColor={disabled ? 'minimal' : 'high'}>
          {getDisplayValue() || ' '}
        </TextComponent>
      </HintInputContainer>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseCalendar}
      >
        <View className="flex-1 justify-end" style={{ paddingBottom: bottom }}>
          <View className="bg-surface-overlay rounded-t-deca p-deca">
            <Calendar
              type={type}
              value={value}
              month={month}
              year={year}
              onChange={handleChange}
              locale={locale}
              TextComponent={TextComponent}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

export default DatePicker;
