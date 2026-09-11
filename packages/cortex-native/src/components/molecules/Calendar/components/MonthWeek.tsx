import { compareAsc, isSameDay } from '@tecsinapse/cortex-core';
import React from 'react';
import { View } from 'react-native';
import type { TextProps } from '../../../atoms/Text/Text';
import PressableSurface from '../../../atoms/PressableSurface/PressableSurface';
import {
  calendarCellSelected,
  calendarWeek,
  getCalendarCellClasses,
} from '../../../../styles/calendar';
import { DateRange, SelectionType, Value } from '../types';

interface IMonthWeek<T extends SelectionType> {
  TextComponent: React.FC<TextProps>;
  /** any as workaround for TS type mismatching */
  onChange?: (value?: any) => void | never;
  type?: T;
  value?: Value<T>;
  week: Date[];
  referenceDate: Date;
}

const MonthWeek = <T extends SelectionType>({
  week,
  referenceDate,
  type,
  value,
  TextComponent,
  onChange,
}: IMonthWeek<T>) => {
  const checkIfIsBetween = React.useCallback(
    (date: Date, _value?: Value<T>) => {
      if (type !== 'range' || !_value) return false;
      else {
        const { lowest, highest } = _value as DateRange;
        if (!highest || !lowest) return false;
        return compareAsc(lowest, date) <= 0 && compareAsc(highest, date) >= 0;
      }
    },
    [type]
  );

  const checkIfIsSelected = React.useCallback(
    (date: Date, _value?: Value<T>) => {
      if (!_value) return false;
      else if (type === 'range' && _value) {
        const { lowest, highest } = _value as DateRange;
        return (
          (lowest ? isSameDay(lowest, date) : false) ||
          (highest ? isSameDay(highest, date) : false)
        );
      } else {
        return isSameDay(_value as Date, date);
      }
    },
    [type]
  );

  const handlePressCell = React.useCallback(
    (date: Date, _value?: Value<T>) => () => {
      if (type === 'day') {
        onChange?.(date as never);
      } else if (!_value) {
        onChange?.({ lowest: date } as never);
      } else {
        let newValue;
        const { lowest, highest } = _value as DateRange;

        if (!highest && lowest) {
          if (compareAsc(date, lowest) === -1) {
            newValue = { lowest: date, highest: undefined };
          } else if (compareAsc(date, lowest) === 0) {
            newValue = undefined;
          } else {
            newValue = { lowest: lowest, highest: date };
          }
        } else if (lowest && highest) {
          if (compareAsc(date, lowest) === -1) {
            newValue = { lowest: date, highest: undefined };
          } else if (compareAsc(date, lowest) === 0) {
            newValue = undefined;
          } else {
            if (compareAsc(date, highest) === -1) {
              newValue = { lowest: lowest, highest: date };
            } else if (compareAsc(date, highest) === 0) {
              newValue = { lowest: lowest, highest: undefined };
            } else {
              newValue = { lowest: lowest, highest: date };
            }
          }
        }

        onChange?.(newValue as never);
      }
    },
    [onChange, type]
  );

  return (
    <View className={calendarWeek}>
      {week.map((date, index) => {
        const isSelected = checkIfIsSelected(date, value);
        const isBetween = checkIfIsBetween(date, value);

        let isRangeStart, isRangeEnd;

        if (type === 'range' && value) {
          const { lowest, highest } = value as DateRange;
          isRangeStart = lowest && isSameDay(lowest, date);
          isRangeEnd = !!highest && isSameDay(highest, date);
        } else {
          isRangeStart = false;
          isRangeEnd = false;
        }

        const colorTone: 'xlight' | 'xdark' | 'light' = isSelected
          ? 'xlight'
          : date.getMonth() === referenceDate.getMonth()
            ? 'xdark'
            : 'light';

        return (
          <PressableSurface
            key={date.getDate()}
            effect="none"
            onPress={handlePressCell(date, value)}
            className={getCalendarCellClasses({
              selected: isSelected,
              highlighted: isBetween,
              isLineEnd: index === 6,
              isLineStart: index === 0,
              isRangeStart: !!isRangeStart,
              isRangeEnd: !!isRangeEnd,
            })}
          >
            {isSelected ? (
              <View className={calendarCellSelected} pointerEvents="none">
                <TextComponent colorVariant="secondary" colorTone={colorTone}>
                  {date.getDate()}
                </TextComponent>
              </View>
            ) : (
              <TextComponent colorVariant="secondary" colorTone={colorTone}>
                {date.getDate()}
              </TextComponent>
            )}
          </PressableSurface>
        );
      })}
    </View>
  );
};

export default React.memo(MonthWeek);
