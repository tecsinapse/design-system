import * as React from 'react';
import { FlatListProps, ListRenderItemInfo } from 'react-native';
import {
  TextProps,
  Text,
} from '@tecsinapse/react-core/src/components/atoms/Text';

import { useTheme } from '@tecsinapse/react-core';

import { RFValue } from '@tecsinapse/react-core/src/utils/ResponsiveFontSize';
import { TimeDigitContainer } from '../styled';

export type DateTimeSelectorMode = 'date' | 'time' | 'datetime' | 'month';

export interface TimeDigitProps extends FlatListProps<number> {
  TextComponent?: React.FC<TextProps>;
  updateType: string;
  data: Array<number>;
  timeLabel: string;
  mode?: DateTimeSelectorMode;
  dateConfirmButtonText?: string;
  timeConfirmButtonText?: string;
  digitsToShow?: number;
  firstDigit?: number;
  currentTime: number;
  initialScrollIndex: number;
  timeCardsBuilder: React.RefCallback<
    (
      item: number,
      updateType: 'hours' | 'minutes',
      currentTime: number
    ) => JSX.Element
  >;
}

const TimeDigit: React.FC<TimeDigitProps> = ({
  TextComponent = Text,
  updateType,
  data,
  timeLabel,
  currentTime,
  timeCardsBuilder,
  initialScrollIndex,
}) => {
  const theme = useTheme();

  const digitCardHeight =
    RFValue(Number(theme.typography.base.fontSize.slice(0, -2))) +
    2 * RFValue(Number(theme.spacing.deca.slice(0, -2)));

  console.log('current time', currentTime);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextComponent
        style={{
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        {timeLabel}
      </TextComponent>
      <TimeDigitContainer
        showsHorizontalScrollIndicator={true}
        data={data}
        updateType={updateType}
        currentTime={currentTime}
        renderItem={({ item }: ListRenderItemInfo<unknown>) =>
          timeCardsBuilder(item, updateType, currentTime)
        }
        keyExtractor={(item: unknown) => String(item)}
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

export default TimeDigit;
