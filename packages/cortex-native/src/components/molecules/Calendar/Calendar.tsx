import { add, cn, format, getCalendarGrid, set } from '@tecsinapse/cortex-core';
import type { Locale } from '@tecsinapse/cortex-core';
import * as React from 'react';
import { useRef } from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import Icon from '../../atoms/Icon/Icon';
import Text, { TextProps } from '../../atoms/Text/Text';
import PressableSurface from '../../atoms/PressableSurface/PressableSurface';
import {
  calendarContent,
  calendarControl,
  calendarTitleRowBase,
} from '../../../styles/calendar';
import { SelectionType, Value } from './types';
import { MonthWeek, SelectYear, SelectYearProps, Weekdays } from './components';
const now = set(new Date(), {
  date: 1,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
});

export interface CalendarProps<T extends SelectionType> extends ViewProps {
  TextComponent?: React.FC<TextProps>;
  year?: number;
  month?: number;
  onChange?: (value?: Value<T>) => void | never;
  type?: T;
  value?: Value<T>;
  locale?: Locale;
  selectYearProps?: Omit<
    SelectYearProps,
    'TextComponent' | 'currentYear' | 'onSelectYear'
  >;
}

function Calendar<T extends SelectionType>({
  TextComponent = Text,
  year: _year,
  month: _month,
  value,
  type,
  onChange,
  locale,
  selectYearProps,
  className,
  ...rest
}: CalendarProps<T>): React.ReactElement {
  const _referenceDate = React.useMemo(
    () =>
      _year && _month
        ? new Date(_year, _month, 1, 0, 0, 0, 0)
        : _month
          ? new Date(now.getFullYear(), _month, 1, 0, 0, 0, 0)
          : now,
    [_year, _month]
  );

  const [referenceDate, setReferenceDate] = React.useState(_referenceDate);
  const [showSelectYear, setShowSelectYear] = React.useState(false);
  const calendarHeightRef = useRef(0);

  const calendar = React.useMemo(
    () =>
      getCalendarGrid(
        referenceDate,
        (locale?.options?.weekStartsOn ?? 0) as 0 | 1 | 2 | 3 | 4 | 5 | 6
      ),
    [referenceDate, locale]
  );

  const handlePressNext = React.useCallback(() => {
    setReferenceDate(add(referenceDate, { months: 1 }));
  }, [referenceDate, setReferenceDate]);

  const handlePressPrev = React.useCallback(() => {
    setReferenceDate(add(referenceDate, { months: -1 }));
  }, [referenceDate, setReferenceDate]);

  const handlePressSelectYear = React.useCallback(() => {
    setShowSelectYear(prevState => !prevState);
  }, [setShowSelectYear]);

  const handleSelectYear = React.useCallback(
    (year: number) => {
      const referenceDateYear = referenceDate.getFullYear();
      const addYears = year - referenceDateYear;
      setReferenceDate(add(referenceDate, { years: addYears }));
      setShowSelectYear(false);
    },
    [referenceDate]
  );

  const title = format(referenceDate, 'MMMM yyyy', { locale });

  return (
    <View className={cn(className)} {...rest}>
      {!showSelectYear && (
        <View className={cn(calendarTitleRowBase, 'justify-between')}>
          <PressableSurface
            onPress={handlePressPrev}
            style={{ alignItems: 'flex-start' }}
            className={calendarControl}
          >
            <Icon
              name="chevron-left"
              type="material-community"
              size="kilo"
              colorVariant="secondary"
              colorTone="medium"
            />
          </PressableSurface>
          <TouchableOpacity onPress={handlePressSelectYear}>
            <TextComponent
              colorVariant="secondary"
              colorTone="xdark"
              fontWeight="bold"
              textTransform="capitalize"
            >
              {title}
            </TextComponent>
          </TouchableOpacity>
          <PressableSurface
            onPress={handlePressNext}
            style={{ alignItems: 'flex-end' }}
            className={calendarControl}
          >
            <Icon
              name="chevron-right"
              type="material-community"
              size="kilo"
              colorVariant="secondary"
              colorTone="medium"
            />
          </PressableSurface>
        </View>
      )}
      {showSelectYear ? (
        <View className={calendarContent} style={{ height: calendarHeightRef.current }}>
          <SelectYear
            currentYear={referenceDate.getFullYear()}
            onSelectYear={handleSelectYear}
            TextComponent={TextComponent}
            {...selectYearProps}
          />
        </View>
      ) : (
        <View
          className={calendarContent}
          onLayout={e =>
            (calendarHeightRef.current = e.nativeEvent.layout.height)
          }
        >
          <Weekdays locale={locale} calendar={calendar} TextComponent={TextComponent} />
          {calendar.map((week, index) => (
            <MonthWeek
              week={week}
              type={type}
              value={value}
              key={`week-${index}`}
              onChange={onChange}
              TextComponent={TextComponent}
              referenceDate={referenceDate}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default Calendar;
