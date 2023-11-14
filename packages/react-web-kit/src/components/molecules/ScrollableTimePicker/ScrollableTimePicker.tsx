import * as React from 'react';
import { ViewProps } from 'react-native';
import {
  BackButton,
  Content,
  Root,
} from '@tecsinapse/react-core/src/components/molecules/DateTimeSelector/styled';
import { RFValue, useTheme, Text, TextProps } from '@tecsinapse/react-core';
//BACKBUTTON, CONTENT, ROOT PRA WEB - STYLED DIV

import TimeDigit from '../InputWebDate/components/ScrollableDigit';

export type DateTimeSelectorMode = 'date' | 'time' | 'datetime' | 'month';

export interface DateTimeSelectorProps extends ViewProps {
  TextComponent?: React.FC<TextProps>;
  value?: Date;
  onChange?: (value: Date) => void | never;
  mode?: DateTimeSelectorMode;
  format?: string;
  locale?: Locale;
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

const ScrollableTimePicker: React.FC<DateTimeSelectorProps> = ({
  TextComponent = Text,
  value,
  onChange,
  date,
  mode = 'datetime',
  dateModalTitle,
  timeModalTitle,
  setDate,
  hourData,
  minuteData,
  dateConfirmButtonText,
  timeConfirmButtonText,
  hourLabel,
  minuteLabel,
  requestCloseSelector,
  ...rest
}) => {
  //   const [date, setDate] = React.useState<Date>(value || new Date());
  const minutesToShow = 60;
  const firstMinute = 0;
  const hoursToShow = 24;
  const firstHour = 0;

  const theme = useTheme();

  const handleTimeChange = (newTime, updateType) => {
    const newDate = new Date(date);

    if (updateType === 'hours') {
      newDate.setHours(Number(newTime));
    } else if (updateType === 'minutes') {
      newDate.setMinutes(Number(newTime));
    }
    setDate(newDate);
  };

  const getCurrentTimeUnit = unit => {
    const currentTime = date[unit === 'hours' ? 'getHours' : 'getMinutes']();
    return currentTime;
  };

  const minutes = React.useMemo(
    () => Array.from({ length: minutesToShow }, (_, i) => i + firstMinute),
    [minutesToShow, firstMinute]
  );

  const hours = React.useMemo(
    () => Array.from({ length: hoursToShow }, (_, i) => i + firstHour),
    [hoursToShow, firstHour]
  );

  const getInitialScrollIndex = (value, data) => {
    const selectedIndex = data.findIndex(item => item === value);
    return selectedIndex >= 0 ? selectedIndex : 0;
  };

  const digitCardHeight =
    RFValue(Number(theme.typography.base.fontSize.slice(0, -2))) +
    2 * RFValue(Number(theme.spacing.deca.slice(0, -2)));

  return (
    <Content style={{ width: 150, flexDirection: 'column' }}>
      <Content>
        <TimeDigit
          data={hours}
          updateType={'hours'}
          timeLabel={'Hour'}
          handleTimeChange={handleTimeChange}
          currentTime={getCurrentTimeUnit('hours')}
          keyExtractor={item => String(item)}
          currentTimeUnit={getCurrentTimeUnit('hours')}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          numColumns={1}
          initialScrollIndex={getInitialScrollIndex(date.getHours(), hours)}
          getItemLayout={(_, index) => ({
            length: digitCardHeight,
            offset: digitCardHeight * index,
            index,
          })}
          fadingEdgeLength={200}
        />
        <TimeDigit
          data={minutes}
          updateType={'minutes'}
          currentTime={getCurrentTimeUnit('minutes')}
          timeLabel={'Minute'}
          handleTimeChange={handleTimeChange}
          keyExtractor={item => String(item)}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          numColumns={1}
          initialScrollIndex={getInitialScrollIndex(date.getMinutes(), minutes)}
          currentTimeUnit={getCurrentTimeUnit('minutes')}
          getItemLayout={(_, index) => ({
            length: digitCardHeight,
            offset: digitCardHeight * index,
            index,
          })}
          fadingEdgeLength={200}
        />
      </Content>
    </Content>
  );
};

export default ScrollableTimePicker;
