import React from 'react';
import { compareAsc as compare, isSameDay } from 'date-fns';
import { Cell, Selected, Week } from '../styled';
import { Value, DateRange, SelectionType } from '../Calendar';
import { TextProps } from '@tecsinapse/react-core';

interface IMonthWeek<T extends SelectionType> {
  TextComponent: React.FC<TextProps>;
  /** any as workaround for TS type mismatching */
  onChange?: (value?: any) => void | never;
  type?: T;
  value?: Value<T>;
  week: Date[];
  referenceDate: Date;
}

const MonthWeek = <T extends SelectionType>({
  week,
  referenceDate,
  type,
  value,
  TextComponent,
  onChange,
}: IMonthWeek<T>) => {
  const checkIfIsBetween = React.useCallback(
    (date: Date, _value?: Value<T>) => {
      if (type !== 'range' || !_value) return false;
      else {
        const { lowest, highest } = _value as DateRange;
        if (!highest) return false;
        return compare(lowest, date) <= 0 && compare(highest, date) >= 0;
      }
    },
    [type]
  );

  const checkIfIsSelected = React.useCallback(
    (date: Date, _value?: Value<T>) => {
      if (!_value) return false;
      else if (type === 'range' && _value) {
        const { lowest, highest } = _value as DateRange;
        return (
          isSameDay(lowest, date) ||
          (highest ? isSameDay(highest, date) : false)
        );
      } else {
        return isSameDay(_value as Date, date);
      }
    },
    [type]
  );

  const handlePressCell = React.useCallback(
    (date: Date, _value?: Value<T>) => () => {
      if (type === 'day') {
        onChange?.(date as never);
      } else if (!_value) {
        onChange?.({ lowest: date } as never);
      } else {
        let newValue;
        const { lowest, highest } = _value as DateRange;

        if (!highest) {
          if (compare(date, lowest) === -1) {
            // newValue = { lowest: date, highest: lowest };
            newValue = { lowest: date, highest: undefined };
          } else if (compare(date, lowest) === 0) {
            newValue = undefined;
          } else {
            newValue = { lowest: lowest, highest: date };
          }
        } else {
          if (compare(date, lowest) === -1) {
            // newValue = { lowest: date, highest: highest };
            newValue = { lowest: date, highest: undefined };
          } else if (compare(date, lowest) === 0) {
            // newValue = { lowest: highest, highest: undefined };
            newValue = undefined;
          } else {
            if (compare(date, highest) === -1) {
              // const lowestDiff = Math.abs(differenceInDays(date, lowest));
              // const highestDiff = Math.abs(differenceInDays(date, highest));
              // newValue = {
              //   lowest: lowestDiff < highestDiff ? date : lowest,
              //   highest: highestDiff <= lowestDiff ? date : highest,
              // };
              newValue = { lowest: lowest, highest: date };
            } else if (compare(date, highest) === 0) {
              newValue = { lowest: lowest, highest: undefined };
            } else {
              newValue = { lowest: lowest, highest: date };
            }
          }
        }

        onChange?.(newValue as never);
      }
    },
    [onChange, type]
  );

  return (
    <Week>
      {week.map((date, index) => {
        const isSelected = checkIfIsSelected(date, value);
        const isBetween = checkIfIsBetween(date, value);

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
            onPress={handlePressCell(date, value)}
          >
            <Selected selected={isSelected} pointerEvents={'none'}>
              <TextComponent colorVariant={'secondary'} colorTone={colorTone}>
                {date.getDate()}
              </TextComponent>
            </Selected>
          </Cell>
        );
      })}
    </Week>
  );
};

export default React.memo(MonthWeek);
