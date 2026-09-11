import { format as formatDate } from '@tecsinapse/cortex-core';
import type { Locale } from '@tecsinapse/cortex-core';
import React, { useEffect, useRef } from 'react';
import {
  ScrollView,
  Text,
  TextProps,
  TouchableOpacity,
  View,
} from 'react-native';

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
  TextComponent?: React.FC<TextProps>;

  onChange(type: string, digit: number): void;
}

const DateBlock: React.FC<DateBlockProps> = ({
  value,
  digits,
  type,
  onChange,
  height = 170,
  fontSize,
  textColor,
  markColor,
  markHeight,
  markWidth,
  TextComponent = Text,
  locale,
}) => {
  const months = [...Array(12)].map((_, index) =>
    formatDate(new Date().setMonth(index), 'MMM', { locale })
  );

  const dHeight: number = Math.round(height / 4);

  const mHeight: number = markHeight ?? Math.min(dHeight, 65);
  const mWidth: number = markWidth ?? 70;

  const offsets = digits.map((_: number, index: number) => index * dHeight);
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
      return months[value - 1];
    } else {
      return value.toString().padStart(2, '0');
    }
  };

  return (
    <View className="flex-1 items-center justify-center flex-row h-full">
      <View
        className="absolute"
        style={{
          top: (height - mHeight) / 2,
          borderRadius: 10,
          backgroundColor: markColor ?? 'rgba(0, 0, 0, 0.05)',
          height: mHeight,
          width: mWidth,
        }}
      />
      <ScrollView
        ref={scrollRef}
        className="w-full"
        snapToOffsets={offsets}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={0}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        fadingEdgeLength={300}
      >
        {digits.map((digit: number, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onChange(type, digits[index]);
                snapScrollToIndex(index);
              }}
            >
              <TextComponent
                style={{
                  textAlign: 'center',
                  fontSize: fontSize || 22,
                  color: textColor || '#000000',
                  marginBottom:
                    index === digits.length - 1 ? height / 2 - dHeight / 2 : 0,
                  marginTop: index === 0 ? height / 2 - dHeight / 2 : 0,
                  lineHeight: dHeight,
                  height: dHeight,
                  textTransform: 'capitalize',
                }}
              >
                {getDisplayedValue(type)(digit)}
              </TextComponent>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DateBlock;
