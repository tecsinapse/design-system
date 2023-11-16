import * as React from 'react';
import { ScrollableDigit } from '../InputWebDate/components';
import { DivStyledColumn, DivStyledRow } from './styled';

export interface DateTimeSelectorProps {
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  date: Date;
  locale?: Locale;
  minuteLabel?: string;
  hourLabel?: string;
}

const ScrollableTimePicker: React.FC<DateTimeSelectorProps> = ({
  date,
  setDate,
  minuteLabel,
  hourLabel,
}) => {
  const handleTimeChange = (newTime, updateType) => {
    const newDate = new Date(date);

    if (updateType === 'hour') {
      newDate.setHours(Number(newTime));
    } else if (updateType === 'minute') {
      newDate.setMinutes(Number(newTime));
    }
    setDate(newDate);
  };

  const minutes = Array.from({ length: 60 }, (_, i) => String(i));

  const hours = Array.from({ length: 24 }, (_, i) => String(i));

  const getInitialScrollIndex = (value, data) => {
    const selectedIndex = data.findIndex(item => item === value);
    return selectedIndex >= 0 ? selectedIndex : 0;
  };

  return (
    <DivStyledColumn>
      <DivStyledRow>
        <ScrollableDigit
          data={hours}
          timeLabel={hourLabel ?? 'Hour'}
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
          timeLabel={minuteLabel ?? 'Minute'}
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
