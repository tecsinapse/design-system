import React from 'react';
import { Cell, Week } from '../styled';
import { format } from 'date-fns';

interface IWeekdays {
  calendar: Date[][];
  locale?: Locale;
  Capitalized: React.ElementType;
}

const Weekdays = ({ calendar, locale, Capitalized }: IWeekdays) => {
  return (
    <Week>
      {calendar[0].map(date => (
        <Cell
          key={date.getDate()}
          selected={false}
          highlighted={false}
          isLineEnd={false}
          isLineStart={false}
          isRangeStart={false}
          isRangeEnd={false}
          pointerEvents={'none'}
        >
          <Capitalized colorVariant={'secondary'} colorTone={'medium'}>
            {format(date, 'EEE', { locale }).slice(0, 3)}
          </Capitalized>
        </Cell>
      ))}
    </Week>
  );
};

export default React.memo(Weekdays);
