import { format } from '@tecsinapse/cortex-core';
import type { Locale } from '@tecsinapse/cortex-core';
import React from 'react';
import { View } from 'react-native';
import Text, { TextProps } from '../../../atoms/Text/Text';
import { calendarWeek } from '../../../../styles/calendar';

interface IWeekdays {
  calendar: Date[][];
  locale?: Locale;
  TextComponent: React.FC<TextProps>;
}

const Weekdays = ({ calendar, locale, TextComponent }: IWeekdays) => {
  return (
    <View className={calendarWeek}>
      {calendar[0].map(date => (
        <View key={date.getDate()} className="flex-1 aspect-square justify-center items-center">
          <TextComponent colorVariant="secondary" colorTone="medium">
            {format(date, 'EEE', { locale }).slice(0, 3)}
          </TextComponent>
        </View>
      ))}
    </View>
  );
};

export default React.memo(Weekdays);
