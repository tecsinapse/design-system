import * as React from 'react';
import {
  compareAsc,
  getDaysInMonth,
  isSameDay,
  format as formatDate,
  isSameMonth,
  isSameYear,
  set,
  Locale,
} from 'date-fns';
import { TextComponent } from 'react-native';

import {
  Granularity,
  Selector,
  SelectorProps,
} from '../DateTimeSelector/Selector';
import { SelectorContainer, Content } from '../DateTimeSelector/styled';
import { TextProps } from '../../atoms/Text';
import { DateTimeSelectorMode } from '../DateTimeSelector';
import ScrollableSelector from '../ScrollableSelector/ScrollableSelector';

interface OldDateTimeSelector extends SelectorProps {
  TextComponent: React.FC<TextProps>;
  mode?: DateTimeSelectorMode;
  dayLabel?: string;
  monthLabel?: string;
  yearLabel?: string;
  hourLabel?: string;
  locale: Locale;
  upperDateThreshold: Date | undefined;
  getDisplayedValue: number;
  lowerDateThreshold: Date | undefined;
  referenceDate: Date;
  // onChange: (value: number) => void | never;
  dateValue: Date;
  setDate: React.Dispatch<React.SetStateAction<number | Date>>;
  getDisplayValue: (value: number) => string;
}

const OldDateTimeSelector: React.FC<OldDateTimeSelector> = ({
  mode = 'month',
  TextComponent,
  monthLabel,
  yearLabel,
  dateValue,
  setDate,
  locale,
  dayLabel,
  onChange,
  upperDateThreshold,
  lowerDateThreshold,
  referenceDate,
}) => {
  const getDisplayedValue = (granularity: Granularity) => (value: number) => {
    return granularity === 'month'
      ? formatDate(dateValue, 'MMM', { locale: locale }).slice(0, 3)
      : value.toString().padStart(2, '0');
  };

  const handleChange = (granularity: Granularity) => (newValue: number) => {
    setDate(date => {
      let newState: Date;
      // Months and years must have a different handling for being
      // the only date units that may interfere another unit.
      if (['month', 'year'].includes(granularity)) {
        let newDate = set(date, { [granularity]: newValue });
        const daysInMonth = getDaysInMonth(newDate);
        if (granularity === 'year' && date.getMonth() != newDate.getMonth()) {
          newDate = set(newDate, { month: date.getMonth() });
          newState = set(newDate, { date: getDaysInMonth(newDate) });
        }
        newState =
          daysInMonth < date.getDate()
            ? set(newDate, { date: daysInMonth })
            : newDate;
      } else {
        newState = set(date, { [granularity]: newValue });
      }

      if (upperDateThreshold && compareAsc(newState, upperDateThreshold) > 0) {
        return upperDateThreshold;
      } else if (
        lowerDateThreshold &&
        compareAsc(newState, lowerDateThreshold) < 0
      ) {
        return lowerDateThreshold;
      } else {
        return newState;
      }
    });
  };

  return (
    <Content>
      <Content>
        <SelectorContainer isLast>
          <Selector
            TextComponent={TextComponent}
            onChange={handleChange('year')}
            referenceDate={dateValue}
            dateValue={dateValue.getFullYear()}
            label={yearLabel || 'Year'}
            // granularity={'year'}
            // getDisplayValue={getDisplayedValue('year')}
            preventUpper={
              upperDateThreshold
                ? isSameYear(upperDateThreshold, dateValue)
                : false
            }
            preventLower={
              lowerDateThreshold
                ? isSameYear(lowerDateThreshold, dateValue)
                : false
            }
          />
        </SelectorContainer>
      </Content>
    </Content>
    //     <Content>
    //     <SelectorContainer isFirst>
    //       <Selector
    //         TextComponent={TextComponent}
    //         onChange={handleChange('hours')}
    //         referenceDate={date}
    //         value={date.getHours()}
    //         label={hourLabel || 'Hour'}
    //         granularity={'hours'}
    //         getDisplayValue={getDisplayedValue('hours')}
    //       />
    //     </SelectorContainer>
    //     <SelectorContainer isLast>
    //       <Selector
    //         TextComponent={TextComponent}
    //         onChange={handleChange('minutes')}
    //         referenceDate={date}
    //         value={date.getMinutes()}
    //         label={minuteLabel || 'Minute'}
    //         granularity={'minutes'}
    //         getDisplayValue={getDisplayedValue('minutes')}
    //       />
    //     </SelectorContainer>
    //   </Content>
  );
};

export default OldDateTimeSelector;
