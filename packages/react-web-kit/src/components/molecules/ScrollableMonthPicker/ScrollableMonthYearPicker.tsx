/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { ViewProps } from 'react-native';
import { RFValue, useTheme, Text, TextProps } from '@tecsinapse/react-core';
//BACKBUTTON, CONTENT, ROOT PRA WEB - STYLED DIV

import ScrollableDigit from '../InputWebDate/components/ScrollableDigit';
import { DivStyledColumn, DivStyledRow } from './styled';

export type DateTimeSelectorMode = 'date' | 'time' | 'datetime' | 'month';

export interface ScrollableMonthYearProps extends ViewProps {
  TextComponent?: React.FC<TextProps>;
  value?: Date;
  onChange?: (value: Date) => void | never;
  mode?: DateTimeSelectorMode;
  format?: string;
  locale?: Locale;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  dateModalTitle?: string;
  timeModalTitle?: string;
  dateConfirmButtonText?: string;
  timeConfirmButtonText?: string;
  dayLabel?: string;
  monthLabel?: string;
  yearLabel?: string;
  hourLabel?: string;
  minuteLabel?: string;
  requestCloseSelector: () => void;
}

const ScrollableMonthYearPicker: React.FC<ScrollableMonthYearProps> = ({
  TextComponent = Text,
  value,
  onChange,
  date,
  mode,
  dateModalTitle,
  timeModalTitle,
  setDate,
  dateConfirmButtonText,
  timeConfirmButtonText,
  hourLabel,
  minuteLabel,
  requestCloseSelector,
  ...rest
}) => {
  const handleMonthYearChange = (newTime, updateType) => {
    const newDate = new Date(date);

    if (updateType === 'year') {
      newDate.setFullYear(Number(newTime));
    } else if (updateType === 'month') {
      newDate.setMonth(Number(newTime));
    }
    setDate(newDate);
  };

  const yearsToShow = 10;
  const firstYear = new Date().getFullYear();
  const monthsToShow = 12;
  const firstMonth = 1;

  const theme = useTheme();

  const getCurrentTimeUnit = (unit: string) => {
    const currentTime = date[unit === 'year' ? 'getFullYear' : 'getMonth']();
    return currentTime;
  };

  const years = React.useMemo(
    () => Array.from({ length: yearsToShow }, (_, i) => i + firstYear),
    [yearsToShow, firstYear]
  );

  const months = React.useMemo(
    () => Array.from({ length: monthsToShow }, (_, i) => i + firstMonth),
    [monthsToShow, firstMonth]
  );

  const getInitialScrollIndex = (value, data) => {
    const selectedIndex = data.findIndex(item => item === value);
    return selectedIndex >= 0 ? selectedIndex : 0;
  };

  const digitCardHeight =
    RFValue(Number(theme.typography.base.fontSize.slice(0, -2))) +
    2 * RFValue(Number(theme.spacing.deca.slice(0, -2)));

  return (
    <DivStyledColumn>
      <DivStyledRow>
        <ScrollableDigit
          data={months}
          updateType={'month'}
          timeLabel={'Month'}
          handleTimeChange={handleMonthYearChange}
          currentTime={getCurrentTimeUnit('month')}
          keyExtractor={item => String(item)}
          currentTimeUnit={getCurrentTimeUnit('month')}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          numColumns={1}
          initialScrollIndex={getInitialScrollIndex(date.getMonth(), months)}
          getItemLayout={(_, index) => ({
            length: digitCardHeight,
            offset: digitCardHeight * index,
            index,
          })}
          fadingEdgeLength={200}
        />
        <ScrollableDigit
          data={years}
          updateType={'year'}
          currentTime={getCurrentTimeUnit('year')}
          timeLabel={'Year'}
          handleTimeChange={handleMonthYearChange}
          keyExtractor={item => String(item)}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          numColumns={1}
          initialScrollIndex={getInitialScrollIndex(date.getFullYear(), years)}
          currentTimeUnit={getCurrentTimeUnit('year')}
          getItemLayout={(_, index) => ({
            length: digitCardHeight,
            offset: digitCardHeight * index,
            index,
          })}
          fadingEdgeLength={200}
        />
      </DivStyledRow>
    </DivStyledColumn>
  );
};

export default ScrollableMonthYearPicker;
