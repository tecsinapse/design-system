import * as React from 'react';
import {
  Root,
  Cell,
  Week,
  Title,
  Button,
  Content,
  DayOfWeek,
  DayOfMonth,
  TitleContainer,
} from './styled';
import { ViewProps } from 'react-native';
import {
  startOfMonth,
  getDaysInMonth,
  getWeeksInMonth,
  add,
  isFuture,
  isPast,
  isSameDay,
  set,
  compareAsc,
  min,
} from 'date-fns';

type SelectionType = 'range' | 'day';

export interface CalendarProps<T extends SelectionType> extends ViewProps {
  year?: number;
  month?: number;
  onChange?: (
    date: T extends 'range' ? (Date | undefined)[] : Date
  ) => void | never;
  type?: T;
  value?: T extends 'range' ? (Date | undefined)[] : Date;
}

const now = set(new Date(), {
  date: 1,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
});

function dayOfWeekFromMonday(dayOfWeek: number) {
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
}

function Calendar<T extends SelectionType>({
  year: _year,
  month: _month,
  value: _value,
  type,
  onChange,
  ...rest
}: CalendarProps<T>): JSX.Element {
  const value = _value
    ? type === 'day'
      ? [_value as Date | undefined]
      : (_value as (Date | undefined)[])
    : undefined;

  const date =
    _year && _month
      ? new Date(_year, _month, 1, 0, 0, 0, 0)
      : _month
      ? new Date(now.getFullYear(), _month, 1, 0, 0, 0, 0)
      : now;

  const startingWeekDay = dayOfWeekFromMonday(date.getDay());
  const weeksInMonth = getWeeksInMonth(date, { weekStartsOn: 1 });

  const calendar = [...Array(weeksInMonth).keys()].map(week =>
    [...Array(7).keys()].map(weekDayIndex =>
      add(date, {
        days: 6 * week + week + weekDayIndex - startingWeekDay,
      })
    )
  );

  const checkIfIsBetween = (date: Date) =>
    type !== 'range' || !value
      ? false
      : (value[0] &&
          compareAsc(value[0], date) <= 0 &&
          value[1] &&
          compareAsc(value[1], date) >= 0) ||
        false;

  const handlePressCell = (date: Date) => () => {
    if (type === 'day') {
      onChange?.(date as never);
    } else {
      const c1 = value?.[0] && compareAsc(date, value[0]);
      const c2 = value?.[1] && compareAsc(date, value[1]);
      const newValue = [...(value as (Date | undefined)[])];

      if (!c1 || c1 === -1 || (c1 === 1 && c2 && c2 === -1)) {
        newValue[0] = date;
      } else if (c1 === 0) {
        newValue[0] = undefined;
      } else if (!c2 || c2 === 1 || (c2 === -1 && c1 && c1 === 1)) {
        newValue[1] = date;
      } else if (c2 === 0) {
        newValue[1] = undefined;
      }

      onChange?.(newValue as never);
    }
  };

  return (
    <Root {...rest}>
      <TitleContainer>
        <Button></Button>
        <Title></Title>
        <Button></Button>
      </TitleContainer>
      <Content>
        {calendar.map((week, index) => (
          <Week key={`week-${index}`}>
            {week.map((date, index) => {
              const rangeIndex =
                value?.findIndex(value => value && isSameDay(value, date)) ||
                -1;

              const isSelected = rangeIndex !== -1;
              const isBetween = checkIfIsBetween(date);

              return (
                <Cell
                  key={date.getDate()}
                  selected={isSelected}
                  highlighted={isBetween}
                  isLineEnd={index === 6}
                  isLineStart={index === 0}
                  isRangeStart={(value?.length || 0) > 1 && rangeIndex === 0}
                  isRangeEnd={(value?.length || 0) > 1 && rangeIndex === 1}
                  onPress={handlePressCell(date)}
                >
                  <DayOfMonth selected={isSelected}>
                    {date.getDate()}
                  </DayOfMonth>
                </Cell>
              );
            })}
          </Week>
        ))}
      </Content>
    </Root>
  );
}

export default Calendar;
