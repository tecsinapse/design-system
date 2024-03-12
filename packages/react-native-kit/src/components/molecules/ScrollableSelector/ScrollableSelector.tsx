import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text } from '../../atoms/Text';
import { BlockLabels } from './styled';
import { DateBlock } from './components';
import { DateTimeSelectorProps } from '@tecsinapse/react-core';
import { getLocale } from '../../../utils/date';

export interface ScrollableSelectorProps extends DateTimeSelectorProps {
  height?: number;
  width?: number;
  fontSize?: number;
  textColor?: string;
  startYear?: number;
  endYear?: number;
  markColor?: string;
  markHeight?: number;
  markWidth?: number;
}

const ScrollableSelector: React.FC<ScrollableSelectorProps> = ({
  value,
  onChange,
  height,
  width,
  fontSize,
  textColor,
  startYear,
  endYear,
  markColor,
  markHeight,
  markWidth,
  format,
  monthLabel,
  yearLabel,
  hourLabel,
  minuteLabel,
  TextComponent = Text,
  locale = getLocale(),
}) => {
  const date = useMemo(() => value ?? new Date(), [value]);
  const [months, setMonths] = useState<number[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [hour, setHour] = useState<number[]>([]);
  const [minutes, setMinutes] = useState<number[]>([]);

  useEffect(() => {
    const end = endYear || new Date().getFullYear();
    const start = !startYear || startYear > end ? end - 100 : startYear;
    const _months = [...Array(12)].map((_, index) => index + 1);
    const _years = [...Array(end - start + 1)].map((_, index) => start + index);
    const _hour = [...Array(24)].map((_, index) => index);
    const _minutes = [...Array(60)].map((_, index) => index);
    setMonths(_months);
    setYears(_years);
    setHour(_hour);
    setMinutes(_minutes);
  }, []);

  const pickerHeight: number = Math.round(
    height ?? Dimensions.get('window').height / 3.5
  );
  const pickerWidth = width ?? '100%';

  const changeHandle = useCallback(
    (type: string, digit: number): void => {
      switch (type) {
        case 'month':
          date.setMonth(digit - 1);
          break;
        case 'year':
          date.setFullYear(digit);
          break;
        case 'hour':
          date.setHours(digit);
          break;
        case 'minutes':
          date.setMinutes(digit);
      }
      onChange?.(date);
    },
    [date]
  );

  const getOrder = useCallback(() => {
    return (format || 'dd-MM-yyyy' || 'HH-mm' || 'MM-yyyy')
      .split('-')
      .map((type, index) => {
        switch (type) {
          case 'MM':
            return {
              name: 'month',
              digits: months,
              value: date.getMonth() + 1,
            };
          case 'yyyy':
            return { name: 'year', digits: years, value: date.getFullYear() };
          case 'HH':
            return { name: 'hour', digits: hour, value: date.getHours() };
          case 'mm':
            return {
              name: 'minutes',
              digits: minutes,
              value: date.getMinutes(),
            };
          default:
            return {
              name: ['day', 'month', 'year', 'hour', 'minutes'][index],
              digits: [months, years, hour, minutes][index],
              value: [
                date.getDate(),
                date.getMonth() + 1,
                date.getFullYear(),
                date.getHours(),
                date.getMinutes(),
              ][index],
            };
        }
      });
  }, [format, date, months, years, hour, minutes]);

  return (
    <View style={{ flexDirection: 'column', width: '100%' }}>
      <BlockLabels>
        {format === 'MM-yyyy' ? (
          <>
            <TextComponent>{monthLabel}</TextComponent>
            <TextComponent>{yearLabel}</TextComponent>
          </>
        ) : (
          <>
            <TextComponent>{hourLabel}</TextComponent>
            <TextComponent>{minuteLabel}</TextComponent>
          </>
        )}
      </BlockLabels>
      <View
        style={[styles.picker, { height: pickerHeight, width: pickerWidth }]}
      >
        {getOrder().map((el, index) => {
          return (
            <DateBlock
              date={value ?? new Date()}
              digits={el.digits}
              value={el.value}
              onChange={changeHandle}
              height={pickerHeight}
              fontSize={fontSize ?? 22}
              textColor={textColor}
              markColor={markColor}
              markHeight={markHeight}
              markWidth={markWidth ?? 70}
              type={el.name}
              key={index}
              locale={locale}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    flexDirection: 'row',
    width: '100%',
  },
  digit: {
    fontSize: 20,
    textAlign: 'center',
  },

  gradient: {
    position: 'absolute',
    width: '100%',
  },
});

export default ScrollableSelector;
