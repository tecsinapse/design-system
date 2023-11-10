import * as React from 'react';
import { FlatList, FlatListProps } from 'react-native';
import {
  TextProps,
  Text,
} from '@tecsinapse/react-core/src/components/atoms/Text';

import { useTheme } from '@tecsinapse/react-core';

import { RFValue } from '@tecsinapse/react-core/src/utils/ResponsiveFontSize';

export type DateTimeSelectorMode = 'date' | 'time' | 'datetime' | 'month';

export interface TimeDigitProps extends FlatListProps<number> {
  TextComponent?: React.FC<TextProps>;
  value?: Date;
  onChange?: (value: Date) => void | never;
  mode?: DateTimeSelectorMode;
  dateConfirmButtonText?: string;
  timeConfirmButtonText?: string;
  digitsToShow?: number;
  firstDigit?: number;
  currentTime: number;
}

const TimeDigit: React.FC<TimeDigitProps> = ({
  TextComponent = Text,
  value,
  updateType,
  onChange,
  data,
  currentTime,
  mode = 'datetime',
  dateConfirmButtonText,
  timeConfirmButtonText,
  yearCardsBuilder,
  initialScrollIndex,
  ...rest
}) => {
  const theme = useTheme();

  const digitCardHeight =
    RFValue(Number(theme.typography.base.fontSize.slice(0, -2))) +
    2 * RFValue(Number(theme.spacing.deca.slice(0, -2)));

  console.log('current time', currentTime);

  return (
    <FlatList
      style={{ overflowY: 'scroll', height: '100px', width: 10 }}
      data={data}
      updateType={updateType}
      currentTime={currentTime}
      renderItem={({ item }) => yearCardsBuilder(item, updateType, currentTime)}
      keyExtractor={item => String(item)}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      numColumns={1}
      initialScrollIndex={0}
      getItemLayout={(_, index) => ({
        length: digitCardHeight,
        offset: digitCardHeight * index,
        index,
      })}
      fadingEdgeLength={200}
    />
  );
};

export default TimeDigit;
