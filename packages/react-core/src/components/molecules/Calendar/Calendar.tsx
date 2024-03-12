import { add, format, getWeeksInMonth, set } from 'date-fns';
import * as React from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { Text, TextProps } from '../../atoms/Text';
import {
  Content,
  Control,
  getCapitalizedTextComponent,
  TitleContainer,
} from './styled';
import { Weekdays, MonthWeek, SelectYear, SelectYearProps } from './components';
import { useRef } from 'react';

export type SelectionType = 'range' | 'day';

export type DateRange = { lowest: Date; highest?: Date };

export type Value<T extends SelectionType> = T extends 'range'
  ? DateRange
  : Date;

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

const now = set(new Date(), {
  date: 1,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
});

function dayOfWeekFromWeekStart(dayOfWeek: number, weekStartsOn: number) {
  return dayOfWeek === 0 ? 0 : dayOfWeek - weekStartsOn;
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
  ...rest
}: CalendarProps<T>): JSX.Element {
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

  const startingWeekDay = React.useMemo(
    () =>
      dayOfWeekFromWeekStart(
        referenceDate.getDay(),
        locale?.options?.weekStartsOn ?? 0
      ),
    [referenceDate, locale]
  );

  const weeksInMonth = React.useMemo(
    () =>
      getWeeksInMonth(referenceDate, {
        weekStartsOn: locale?.options?.weekStartsOn ?? 0,
      }),
    [referenceDate, locale]
  );

  const Capitalized = React.useMemo(
    () => getCapitalizedTextComponent(TextComponent),
    [TextComponent]
  );

  const calendar = React.useMemo(
    () =>
      [...Array(6).keys()].map(week =>
        [...Array(7).keys()].map(weekDayIndex => {
          let addDays = 6 * week + week + weekDayIndex - startingWeekDay;
          if (weeksInMonth == 5 && startingWeekDay == 0) addDays -= 7;
          return add(referenceDate, {
            days: addDays,
          });
        })
      ),
    [weeksInMonth, startingWeekDay, referenceDate]
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

  return (
    <View {...rest}>
      <TitleContainer>
        <Control
          onPress={handlePressPrev}
          align={'start'}
          disabled={showSelectYear}
          isLeft
        >
          <Icon
            name={'chevron-left'}
            type={'material-community'}
            size={'kilo'}
            colorVariant={'secondary'}
            colorTone={'medium'}
          />
        </Control>
        <TouchableOpacity onPress={handlePressSelectYear}>
          <Capitalized
            colorVariant={'secondary'}
            colorTone={'xdark'}
            fontWeight={'bold'}
          >
            {format(referenceDate, 'MMMM yyyy', { locale })}
          </Capitalized>
        </TouchableOpacity>
        <Control
          onPress={handlePressNext}
          align={'end'}
          disabled={showSelectYear}
          isRight
        >
          <Icon
            name={'chevron-right'}
            type={'material-community'}
            size={'kilo'}
            colorVariant={'secondary'}
            colorTone={'medium'}
          />
        </Control>
      </TitleContainer>
      {showSelectYear ? (
        <Content height={calendarHeightRef.current}>
          <SelectYear
            currentYear={referenceDate.getFullYear()}
            onSelectYear={handleSelectYear}
            TextComponent={TextComponent}
            {...selectYearProps}
          />
        </Content>
      ) : (
        <Content
          onLayout={e =>
            (calendarHeightRef.current = e.nativeEvent.layout.height)
          }
        >
          <Weekdays
            locale={locale}
            calendar={calendar}
            Capitalized={Capitalized}
          />
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
        </Content>
      )}
    </View>
  );
}

export default Calendar;
