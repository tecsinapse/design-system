import * as React from 'react';
import { View, ViewProps } from 'react-native';
import Icon from '../../atoms/Icon/Icon';
import Button from '../../atoms/Button/Button';
import Text, { TextProps } from '../../atoms/Text/Text';
import PressableSurface from '../../atoms/PressableSurface/PressableSurface';
import { Calendar } from '../Calendar';
import { ScrollableSelector } from '../ScrollableSelector';
import { getLocale } from '../../../utils/date';
import type { Locale } from '@tecsinapse/cortex-core';

export interface ControlledSelectorComponentProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  currentMode: number;
  isDate: boolean;
  isMonth: boolean;
  handlePressConfirm: () => void;
  handlePressBack: () => void;
  handleCalendarChange: (value?: Date) => void;
  modalTitle?: string;
  confirmButtonText?: string;
}

export interface DateTimePickerSelectorProps
  extends ControlledSelectorComponentProps,
    ViewProps {
  TextComponent?: React.FC<TextProps>;
  locale?: Locale;
  yearLabel?: string;
  monthLabel?: string;
  hourLabel?: string;
  minuteLabel?: string;
}

const DateTimePickerSelector: React.FC<DateTimePickerSelectorProps> = ({
  TextComponent = Text,
  currentMode,
  handlePressBack,
  modalTitle,
  isDate,
  date,
  handleCalendarChange,
  isMonth,
  setDate,
  handlePressConfirm,
  confirmButtonText,
  locale,
  yearLabel,
  monthLabel,
  hourLabel,
  minuteLabel,
  ...rest
}) => {
  return (
    <View className="relative bg-surface-overlay" {...rest}>
      <View className="flex-row items-center mt-mili mb-mili">
        {currentMode === 1 && (
          <PressableSurface
            onPress={handlePressBack}
            effect="none"
            className="rounded-mili p-micro mr-mili aspect-square"
          >
            <Icon
              type="material-community"
              name="chevron-left"
              size="mega"
              colorVariant="secondary"
            />
          </PressableSurface>
        )}
        <TextComponent typography="base" colorVariant="secondary">
          {modalTitle}
        </TextComponent>
      </View>
      {isDate ? (
        <Calendar
          type="day"
          value={date}
          onChange={handleCalendarChange}
          year={date.getFullYear()}
          month={date.getMonth()}
          TextComponent={TextComponent}
        />
      ) : isMonth ? (
        <View className="flex-row justify-between mt-deca mb-deca">
          <ScrollableSelector
            onChange={setDate}
            value={date}
            yearLabel={yearLabel}
            monthLabel={monthLabel}
            format="MM-yyyy"
            locale={locale ?? getLocale()}
            TextComponent={TextComponent}
          />
        </View>
      ) : (
        <View className="flex-row justify-between mt-deca mb-deca">
          <ScrollableSelector
            onChange={setDate}
            value={date}
            hourLabel={hourLabel}
            minuteLabel={minuteLabel}
            format="HH-mm"
            locale={locale ?? getLocale()}
            TextComponent={TextComponent}
          />
        </View>
      )}
      <View className="mx-deca mt-deca mb-mili">
        <Button
          title={confirmButtonText || 'OK'}
          onPress={handlePressConfirm}
          style={{ width: '100%' }}
        />
      </View>
    </View>
  );
};

export default DateTimePickerSelector;
