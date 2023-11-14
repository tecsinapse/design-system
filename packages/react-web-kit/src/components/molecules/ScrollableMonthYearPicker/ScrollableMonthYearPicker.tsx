import * as React from 'react';
import { ViewProps } from 'react-native';

import { DivStyledColumn, DivStyledRow } from './styled';
import { ScrollableDigit } from '../InputWebDate/components';

export type DateTimeSelectorMode = 'date' | 'time' | 'datetime' | 'month';

export interface ScrollableMonthYearProps extends ViewProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const ScrollableMonthYearPicker: React.FC<ScrollableMonthYearProps> = ({
  setDate,
  date,
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

  const yearsToShow = 20;
  const firstYear = new Date().getFullYear() - 10;
  const monthsToShow = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
  ];
  const firstMonth = 1;

  const years = React.useMemo(
    () => Array.from({ length: yearsToShow }, (_, i) => String(i + firstYear)),
    [yearsToShow, firstYear]
  );

  const months = React.useMemo(
    () =>
      Array.from({ length: monthsToShow.length }, (_, i) =>
        String(i + firstMonth)
      ),
    [monthsToShow, firstMonth]
  );

  const getInitialScrollIndex = (value, data) => {
    const selectedIndex = data.findIndex(item => item === value);
    return selectedIndex >= 0 ? selectedIndex : 0;
  };

  return (
    <DivStyledColumn>
      <DivStyledRow>
        <ScrollableDigit
          data={months}
          timeLabel={'Month'}
          handleTimeChange={handleMonthYearChange}
          initialScrollIndex={getInitialScrollIndex(date.getMonth(), months)}
          updateType="month"
          currentTime={date?.getMonth().toString()}
        />
        <ScrollableDigit
          data={years}
          timeLabel={'Year'}
          handleTimeChange={handleMonthYearChange}
          initialScrollIndex={getInitialScrollIndex(date.getFullYear(), years)}
          updateType="year"
          currentTime={date?.getFullYear().toString()}
        />
      </DivStyledRow>
    </DivStyledColumn>
  );
};

export default ScrollableMonthYearPicker;
