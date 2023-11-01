import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { TextProps } from '../../atoms/Text';
import {
  Block,
  BlockLabels,
  DigitText,
  Mark,
  StyledScrollView,
} from './styled';

const ScrollableSelector: React.FC<DatePickerProps> = ({
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
  fadeColor,
  format,
  monthLabel,
  yearLabel,
  hourLabel,
  minuteLabel,
  locale,
  TextComponent = Text,
}) => {
  const [months, setMonths] = useState<number[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [hour, setHour] = useState<number[]>([]);
  const [minutes, setMinutes] = useState<number[]>([]);

  useEffect(() => {
    const end = endYear || new Date().getFullYear();
    const start = !startYear || startYear > end ? end - 100 : startYear;
    const _months = [...Array(12)].map((_, index) => index + 1);
    const _years = [...Array(end - start + 1)].map((_, index) => start + index);
    const _hour = [...Array(24)].map((_, index) => index + 1);
    const _minutes = [...Array(59)].map((_, index) => index + 1);
    setMonths(_months);
    setYears(_years);
    setHour(_hour);
    setMinutes(_minutes);
  }, []);

  const pickerHeight: number = Math.round(
    height || Dimensions.get('window').height / 3.5
  );
  const pickerWidth: number | string = width || '100%';

  const unexpectedDate: Date = new Date(years[0], 0, 1);
  const date = new Date(value || unexpectedDate);

  const changeHandle = (type: string, digit: number): void => {
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
    onChange(date);
  };

  const getOrder = () => {
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
  };

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
              date={date}
              digits={el.digits}
              value={el.value}
              onChange={changeHandle}
              height={pickerHeight}
              fontSize={fontSize ?? 22}
              textColor={textColor}
              markColor={markColor}
              markHeight={markHeight}
              markWidth={markWidth ?? 70}
              fadeColor={fadeColor}
              type={el.name}
              key={index}
            />
          );
        })}
      </View>
    </View>
  );
};

const DateBlock: React.FC<DateBlockProps> = ({
  value,
  digits,
  type,
  onChange,
  height,
  fontSize,
  textColor,
  markColor,
  markHeight,
  markWidth,
  fadeColor,
  locale,
  TextComponent = Text,
}) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dHeight: number = Math.round(height / 4);

  const mHeight: number = markHeight ?? Math.min(dHeight, 65);
  const mWidth: number = markWidth ?? 70;

  const offsets = digits.map((_: number, index: number) => index * dHeight);

  const fadeFilled: string = hex2rgba(fadeColor || '#ffffff', 1);
  const fadeTransparent: string = hex2rgba(fadeColor || '#ffffff', 0);

  const scrollRef = useRef<any>(null);

  const snapScrollToIndex = (index: number) => {
    scrollRef?.current?.scrollTo({ y: dHeight * index, animated: true });
  };

  useEffect(() => {
    snapScrollToIndex(value - digits[0]);
  }, [scrollRef.current]);

  const handleMomentumScrollEnd = ({ nativeEvent }: any) => {
    const digit = Math.round(nativeEvent.contentOffset.y / dHeight + digits[0]);
    onChange(type, digit);
  };

  const getDisplayedValue = (granularity: string) => (value: number) => {
    if (granularity === 'month') {
      return months[value - 1].slice(0, 3);
    } else {
      return value.toString().padStart(2, '0');
    }
  };

  return (
    <Block>
      <Mark
        markTop={(height - mHeight) / 2}
        markColor={markColor ?? 'rgba(0, 0, 0, 0.05)'}
        markHeight={mHeight}
        markWidth={mWidth}
      />
      <StyledScrollView
        ref={scrollRef}
        snapToOffsets={offsets}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={0}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      >
        {digits.map((value: number, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onChange(type, digits[index]);
                snapScrollToIndex(index);
              }}
            >
              <DigitText
                fontSize={fontSize || 22}
                marginBottom={
                  index === digits.length - 1 ? height / 2 - dHeight / 2 : 0
                }
                marginTop={index === 0 ? height / 2 - dHeight / 2 : 0}
                lineHeight={dHeight}
                height={dHeight}
              >
                {getDisplayedValue(type)(value)}
              </DigitText>
            </TouchableOpacity>
          );
        })}
      </StyledScrollView>
      <LinearGradient
        style={[styles.gradient, { bottom: 0, height: height / 4 }]}
        colors={[fadeTransparent, fadeFilled]}
        pointerEvents={'none'}
      />
      <LinearGradient
        style={[styles.gradient, { top: 0, height: height / 4 }]}
        colors={[fadeFilled, fadeTransparent]}
        pointerEvents={'none'}
      />
    </Block>
  );
};

const hex2rgba = (hex: string, alpha: number): string => {
  hex = hex.replace('#', '');

  const r: number = parseInt(
    hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2),
    16
  );
  const g: number = parseInt(
    hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4),
    16
  );
  const b: number = parseInt(
    hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6),
    16
  );

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
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

export interface DatePickerProps {
  value: Date | null | undefined;
  locale?: Locale;
  height?: number;
  width?: number | string;
  fontSize?: number;
  textColor?: string;
  startYear?: number;
  endYear?: number;
  markColor?: string;
  markHeight?: number;
  markWidth?: number;
  monthLabel?: string;
  yearLabel?: string;
  hourLabel?: string;
  minuteLabel?: string;
  fadeColor?: string;
  format?: string;
  TextComponent?: React.FC<TextProps>;

  onChange(value: Date): void;
}

export interface DateBlockProps {
  digits: number[];
  locale?: Locale;
  value: number;
  date: Date;
  type: string;
  height: number;
  fontSize?: number;
  textColor?: string;
  markColor?: string;
  markHeight?: number;
  markWidth?: number;
  fadeColor?: string;
  TextComponent?: React.FC<TextProps>;

  onChange(type: string, digit: number): void;
}

export default ScrollableSelector;
