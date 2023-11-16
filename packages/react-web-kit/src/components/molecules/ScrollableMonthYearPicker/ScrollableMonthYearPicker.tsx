import * as React from 'react';

import { DivStyledColumn, DivStyledRow } from './styled';
import { ScrollableDigit } from '../InputWebDate/components';
import { format as formatDate } from 'date-fns';

export interface ScrollableMonthYearProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  yearLabel?: string;
  monthLabel?: string;
  locale?: Locale;
}

const ScrollableMonthYearPicker: React.FC<ScrollableMonthYearProps> = ({
  setDate,
  date,
  locale,
  monthLabel,
  yearLabel,
}) => {
  const handleMonthYearChange = (newTime, updateType) => {
    const newDate = new Date(date);
    if (updateType === 'year') {
      newDate.setFullYear(Number(newTime));
    } else if (updateType === 'month') {
      newDate.setMonth(months.indexOf(newTime));
    }
    setDate(newDate);
  };

  const yearsToShow = 20;
  const firstYear = new Date().getFullYear() - 10;

  const years = React.useMemo(
    () => Array.from({ length: yearsToShow }, (_, i) => String(i + firstYear)),
    [yearsToShow, firstYear]
  );

  const months = [...Array(12)].map((_, index) =>
    formatDate(new Date().setMonth(index), 'MMM', { locale: locale }).slice(
      0,
      3
    )
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
          timeLabel={monthLabel ?? 'Month'}
          handleTimeChange={handleMonthYearChange}
          initialScrollIndex={getInitialScrollIndex(
            months[date.getMonth()],
            months
          )}
          updateType="month"
          currentTime={months[date.getMonth()]}
        />
        <ScrollableDigit
          data={years}
          timeLabel={yearLabel ?? 'Year'}
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
