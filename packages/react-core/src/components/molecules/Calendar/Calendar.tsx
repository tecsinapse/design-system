import {
  add,
  compareAsc as compare,
  differenceInDays,
  format,
  getWeeksInMonth,
  isSameDay,
  set,
} from 'date-fns';
import * as React from 'react';
import { View, ViewProps } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { Text, TextProps } from '../../atoms/Text';
import {
  Cell,
  Content,
  Control,
  getCapitalizedTextComponent,
  Selected,
  TitleContainer,
  Week,
} from './styled';

export type SelectionType = 'range' | 'day';

export type DateRange = { lowest: Date; highest?: Date };

type Value<T extends SelectionType> = T extends 'range' ? DateRange : Date;

export interface CalendarProps<T extends SelectionType> extends ViewProps {
  TextComponent?: React.FC<TextProps>;
  year?: number;
  month?: number;
  onChange?: (value?: Value<T>) => void | never;
  type?: T;
  value?: Value<T>;
  locale?: Locale;
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
  TextComponent = Text,
  year: _year,
  month: _month,
  value,
  type,
  onChange,
  locale,
  ...rest
}: CalendarProps<T>): JSX.Element {
  const _referenceDate =
    _year && _month
      ? new Date(_year, _month, 1, 0, 0, 0, 0)
      : _month
      ? new Date(now.getFullYear(), _month, 1, 0, 0, 0, 0)
      : now;

  const [referenceDate, setReferenceDate] = React.useState(_referenceDate);

  const startingWeekDay = dayOfWeekFromMonday(referenceDate.getDay());

  const weeksInMonth = getWeeksInMonth(referenceDate, { weekStartsOn: 1 });

  const Capitalized = getCapitalizedTextComponent(TextComponent);

  const calendar = [...Array(weeksInMonth).keys()].map(week =>
    [...Array(7).keys()].map(weekDayIndex =>
      add(referenceDate, {
        days: 6 * week + week + weekDayIndex - startingWeekDay,
      })
    )
  );

  const checkIfIsBetween = (date: Date) => {
    if (type !== 'range' || !value) return false;
    else {
      const { lowest, highest } = value as DateRange;
      if (!highest) return false;
      return compare(lowest, date) <= 0 && compare(highest, date) >= 0;
    }
  };

  const checkIfIsSelected = (date: Date) => {
    if (!value) return false;
    else if (type === 'range' && value) {
      const { lowest, highest } = value as DateRange;
      return (
        isSameDay(lowest, date) || (highest ? isSameDay(highest, date) : false)
      );
    } else {
      return isSameDay(value as Date, date);
    }
  };

  const handlePressCell = (date: Date) => () => {
    if (type === 'day') {
      onChange?.(date as never);
    } else if (!value) {
      onChange?.({ lowest: date } as never);
    } else {
      let newValue;
      const { lowest, highest } = value as DateRange;

      if (!highest) {
        if (compare(date, lowest) === -1) {
          newValue = { lowest: date, highest: lowest };
        } else if (compare(date, lowest) === 0) {
          newValue = undefined;
        } else {
          newValue = { lowest: lowest, highest: date };
        }
      } else {
        if (compare(date, lowest) === -1) {
          newValue = { lowest: date, highest: highest };
        } else if (compare(date, lowest) === 0) {
          newValue = { lowest: highest, highest: undefined };
        } else {
          if (compare(date, highest) === -1) {
            const lowestDiff = Math.abs(differenceInDays(date, lowest));
            const highestDiff = Math.abs(differenceInDays(date, highest));
            newValue = {
              lowest: lowestDiff < highestDiff ? date : lowest,
              highest: highestDiff <= lowestDiff ? date : highest,
            };
          } else if (compare(date, highest) === 0) {
            newValue = { lowest: lowest, highest: undefined };
          } else {
            newValue = { lowest: lowest, highest: date };
          }
        }
      }

      onChange?.(newValue as never);
    }
  };

  const handlePressNext = () => {
    setReferenceDate(add(referenceDate, { months: 1 }));
  };

  const handlePressPrev = () => {
    setReferenceDate(add(referenceDate, { months: -1 }));
  };

  return (
    <View {...rest}>
      <TitleContainer>
        <Control onPress={handlePressPrev} align={'start'} isLeft>
          <Icon
            name={'chevron-left'}
            type={'material-community'}
            size={'kilo'}
            colorVariant={'secondary'}
            colorTone={'medium'}
          />
        </Control>
        <Capitalized
          colorVariant={'secondary'}
          colorTone={'xdark'}
          fontWeight={'bold'}
        >
          {format(referenceDate, 'MMMM yyyy', { locale })}
        </Capitalized>
        <Control onPress={handlePressNext} align={'end'} isRright>
          <Icon
            name={'chevron-right'}
            type={'material-community'}
            size={'kilo'}
            colorVariant={'secondary'}
            colorTone={'medium'}
          />
        </Control>
      </TitleContainer>
      <Content>
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
        {calendar.map((week, index) => (
          <Week key={`week-${index}`}>
            {week.map((date, index) => {
              const isSelected = checkIfIsSelected(date);
              const isBetween = checkIfIsBetween(date);

              let isRangeStart, isRangeEnd;

              if (type === 'range' && value) {
                const { lowest, highest } = value as DateRange;
                isRangeStart = highest && isSameDay(lowest, date);
                isRangeEnd = !!highest && isSameDay(highest, date);
              } else {
                isRangeStart = false;
                isRangeEnd = false;
              }

              const colorTone = isSelected
                ? 'xlight'
                : date.getMonth() === referenceDate.getMonth()
                ? 'xdark'
                : 'light';

              return (
                <Cell
                  key={date.getDate()}
                  selected={isSelected}
                  highlighted={isBetween}
                  isLineEnd={index === 6}
                  isLineStart={index === 0}
                  isRangeStart={isRangeStart}
                  isRangeEnd={isRangeEnd}
                  onPress={handlePressCell(date)}
                >
                  <Selected selected={isSelected} pointerEvents={'none'}>
                    <TextComponent
                      colorVariant={'secondary'}
                      colorTone={colorTone}
                    >
                      {date.getDate()}
                    </TextComponent>
                  </Selected>
                </Cell>
              );
            })}
          </Week>
        ))}
      </Content>
    </View>
  );
}

export default Calendar;
