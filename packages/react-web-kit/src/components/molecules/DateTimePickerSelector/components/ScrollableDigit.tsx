import * as React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { TextProps, Text } from '@tecsinapse/react-core';
import { useTheme } from '@tecsinapse/react-core';
import { RFValue } from '@tecsinapse/react-core';
import { StyledTextLabel, TimeDigitContainer } from '../styled';
import { MemoizedTimeCard } from '.';

export interface ScrollableDigitProps {
  TextComponent?: React.FC<TextProps>;
  updateType: 'hour' | 'minute' | 'year' | 'month';
  currentTime: string;
  data: string[];
  timeLabel: string;
  initialScrollIndex: number;
  handleTimeChange: (newTime: string, updateType: string) => void;
}

const ScrollableDigit: React.FC<ScrollableDigitProps> = ({
  TextComponent = Text,
  data,
  currentTime,
  updateType,
  timeLabel,
  handleTimeChange,
  initialScrollIndex,
}) => {
  const theme = useTheme();

  const digitCardHeight =
    RFValue(Number(theme.typography.base.fontSize.slice(0, -2))) +
    2 * RFValue(Number(theme.spacing.deca.slice(0, -2)));

  const getDisplayedValue = (value: string) => {
    const isNumericValue = parseInt(value, 10);
    if (!isNaN(isNumericValue)) {
      return value.padStart(2, '0');
    } else {
      return value;
    }
  };

  const timeCardsBuilder = React.useCallback(
    ({ item }: ListRenderItemInfo<string>) => (
      <MemoizedTimeCard
        time={getDisplayedValue(item)}
        isSelected={currentTime === item}
        onPress={() => {
          handleTimeChange(item, updateType);
        }}
        TextComponent={TextComponent}
      />
    ),
    [handleTimeChange, TextComponent]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <StyledTextLabel>{timeLabel}</StyledTextLabel>
      <TimeDigitContainer
        showsHorizontalScrollIndicator={true}
        data={data}
        renderItem={timeCardsBuilder}
        keyExtractor={(item: string) => item}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        numColumns={1}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={(_, index) => ({
          length: digitCardHeight,
          offset: digitCardHeight * index,
          index,
        })}
        fadingEdgeLength={200}
      />
    </div>
  );
};

export default ScrollableDigit;
