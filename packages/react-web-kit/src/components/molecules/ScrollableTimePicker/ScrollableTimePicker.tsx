import * as React from 'react';
import { ViewProps } from 'react-native';
import { ScrollableDigit } from '../InputWebDate/components';
import { DivStyledColumn, DivStyledRow } from './styled';

export interface DateTimeSelectorProps extends ViewProps {
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  date: Date;
  locale?: Locale;
}

const ScrollableTimePicker: React.FC<DateTimeSelectorProps> = ({
  date,
  setDate,
}) => {
  const minutesToShow = 60;
  const firstMinute = 0;
  const hoursToShow = 24;
  const firstHour = 0;

  const handleTimeChange = (newTime, updateType) => {
    const newDate = new Date(date);

    if (updateType === 'hour') {
      newDate.setHours(Number(newTime));
    } else if (updateType === 'minute') {
      newDate.setMinutes(Number(newTime));
    }
    setDate(newDate);
  };

  const minutes = React.useMemo(
    () =>
      Array.from({ length: minutesToShow }, (_, i) => String(i + firstMinute)),
    [minutesToShow, firstMinute]
  );

  const hours = React.useMemo(
    () => Array.from({ length: hoursToShow }, (_, i) => String(i + firstHour)),
    [hoursToShow, firstHour]
  );

  const getInitialScrollIndex = (value, data) => {
    const selectedIndex = data.findIndex(item => item === value);
    return selectedIndex >= 0 ? selectedIndex : 0;
  };

  return (
    <DivStyledColumn>
      <DivStyledRow>
        <ScrollableDigit
          data={hours}
          timeLabel={'Hour'}
          handleTimeChange={handleTimeChange}
          currentTime={date?.getHours().toString()}
          updateType={'hour'}
          initialScrollIndex={getInitialScrollIndex(
            date.getHours().toString(),
            hours
          )}
        />
        <ScrollableDigit
          data={minutes}
          timeLabel={'Minute'}
          updateType={'minute'}
          currentTime={date?.getMinutes().toString()}
          handleTimeChange={handleTimeChange}
          initialScrollIndex={getInitialScrollIndex(
            date.getMinutes().toString(),
            minutes
          )}
        />
      </DivStyledRow>
    </DivStyledColumn>
  );
};

export default ScrollableTimePicker;
