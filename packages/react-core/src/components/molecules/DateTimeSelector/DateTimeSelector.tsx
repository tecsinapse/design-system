import * as React from 'react';
import { View, ViewProps } from 'react-native';
import {
  Title,
  Content,
  SelectorContainer,
  Root,
  Control,
  BackButton,
  Header,
} from './styled';
import { Selector, Granularity } from './Selector';
import {
  getDaysInMonth,
  set,
  add,
  sub,
  format as formatDate,
  compareAsc,
  isSameDay,
  isSameMonth,
  isSameYear,
} from 'date-fns';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import { Icon } from '../../atoms/Icon';

export type DateTimeSelectorMode = 'date' | 'time' | 'datetime' | 'month';

export interface DateTimeSelectorProps extends ViewProps {
  value?: Date;
  onChange?: (value: Date) => void | never;

  /**
   * Defines the Picker behavior
   * Must be one of ['date', 'time', 'datetime', 'month']
   */
  mode?: DateTimeSelectorMode;
  format?: string;
  locale?: Locale;

  /**
   * Maximum date from today
   */
  upperDateThreshold?: Date;

  /**
   * Minimum date from today
   */
  lowerDateThreshold?: Date;

  /**
   * Minimum and maximum date in distance units from today.
   * The distance unit used depends on the picker mode
   * If mode is date, the unit is day
   * If mode is time, the unit is hour
   * If mode is datetime, the unit is day
   * If mode is month, the unit is month
   */
  offsetThreshold?: number;

  /**
   * Maximum date in distance units from today.
   * The distance unit used depends on the picker mode
   * If mode is date, the unit is day
   * If mode is time, the unit is hour
   * If mode is datetime, the unit is day
   * If mode is month, the unit is month
   */
  upperOffsetThreshold?: number;

  /**
   * Minimum date in distance units from today.
   * The distance unit used depends on the picker mode
   * If mode is date, the unit is day
   * If mode is time, the unit is hour
   * If mode is datetime, the unit is day
   * If mode is month, the unit is month
   */
  lowerOffsetThreshold?: number;

  dateModalTitle?: string;
  timeModalTitle?: string;
  dateConfirmButtonText?: string;
  timeConfirmButtonText?: string;
  dayLabel?: string;
  monthLabel?: string;
  yearLabel?: string;
  hourLabel?: string;
  minuteLabel?: string;
}

function getThresholdUnit(mode: DateTimeSelectorMode, threshold?: number) {
  if (!threshold) return {};
  if (mode === 'month') {
    return { months: threshold };
  } else if (['date', 'datetime'].includes(mode)) {
    return { days: threshold };
  } else {
    return { hours: threshold };
  }
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  value,
  onChange,
  mode = 'date',
  format,
  locale,
  upperDateThreshold: _upperDateThreshold,
  lowerDateThreshold: _lowerDateThreshold,
  offsetThreshold,
  upperOffsetThreshold,
  lowerOffsetThreshold,
  dateModalTitle,
  timeModalTitle,
  dateConfirmButtonText,
  timeConfirmButtonText,
  dayLabel,
  monthLabel,
  yearLabel,
  hourLabel,
  minuteLabel,
  ...rest
}) => {
  const lowerDateThreshold =
    _lowerDateThreshold ||
    ((offsetThreshold || lowerOffsetThreshold) &&
      sub(
        new Date(),
        getThresholdUnit(mode, offsetThreshold || lowerOffsetThreshold)
      ));

  const upperDateThreshold =
    _upperDateThreshold ||
    ((offsetThreshold || upperOffsetThreshold) &&
      add(
        new Date(),
        getThresholdUnit(mode, offsetThreshold || upperOffsetThreshold)
      ));

  const [date, setDate] = React.useState<Date>(value || new Date());
  const [currentMode, setCurrentMode] = React.useState<0 | 1>(0);

  const isDate =
    ['date', 'month'].includes(mode) ||
    (mode === 'datetime' && currentMode === 0);

  const modalTitle = isDate ? dateModalTitle : timeModalTitle;
  const confirmButtonText = isDate
    ? dateConfirmButtonText
    : timeConfirmButtonText;

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

  const getDisplayedValue = (granularity: Granularity) => (value: number) => {
    return granularity === 'month'
      ? formatDate(date, 'MMM').slice(0, 3)
      : value.toString().padStart(2, '0');
  };

  const handlePressConfirm = () => {
    if (mode === 'datetime' && currentMode === 0) {
      setCurrentMode(1);
    } else {
      onChange?.(date);
    }
  };

  const handlePressBack = () => {
    setCurrentMode(0);
  };

  return (
    <Root {...rest}>
      <Header>
        {currentMode === 1 && (
          <BackButton onPress={handlePressBack}>
            <Icon
              type={'material-community'}
              name={'chevron-left'}
              size={'mega'}
              colorVariant={'secondary'}
            />
          </BackButton>
        )}
        <Title typography={'base'} colorVariant={'secondary'}>
          {modalTitle}
        </Title>
      </Header>

      {isDate ? (
        <Content>
          {mode !== 'month' && (
            <SelectorContainer isFirst>
              <Selector
                onChange={handleChange('date')}
                referenceDate={date}
                value={date.getDate()}
                label={dayLabel || 'Day'}
                granularity={'date'}
                getDisplayValue={getDisplayedValue('date')}
                preventUpper={
                  upperDateThreshold
                    ? isSameDay(upperDateThreshold, date)
                    : false
                }
                preventLower={
                  lowerDateThreshold
                    ? isSameDay(lowerDateThreshold, date)
                    : false
                }
              />
            </SelectorContainer>
          )}
          <SelectorContainer>
            <Selector
              onChange={handleChange('month')}
              referenceDate={date}
              value={date.getMonth()}
              label={monthLabel || 'Month'}
              granularity={'month'}
              getDisplayValue={getDisplayedValue('month')}
              preventUpper={
                upperDateThreshold
                  ? isSameMonth(upperDateThreshold, date)
                  : false
              }
              preventLower={
                lowerDateThreshold
                  ? isSameMonth(lowerDateThreshold, date)
                  : false
              }
            />
          </SelectorContainer>
          <SelectorContainer isLast>
            <Selector
              onChange={handleChange('year')}
              referenceDate={date}
              value={date.getFullYear()}
              label={yearLabel || 'Year'}
              granularity={'year'}
              getDisplayValue={getDisplayedValue('year')}
              preventUpper={
                upperDateThreshold
                  ? isSameYear(upperDateThreshold, date)
                  : false
              }
              preventLower={
                lowerDateThreshold
                  ? isSameYear(lowerDateThreshold, date)
                  : false
              }
            />
          </SelectorContainer>
        </Content>
      ) : (
        <Content>
          <SelectorContainer isFirst>
            <Selector
              onChange={handleChange('hours')}
              referenceDate={date}
              value={date.getHours()}
              label={hourLabel || 'Hour'}
              granularity={'hours'}
              getDisplayValue={getDisplayedValue('hours')}
            />
          </SelectorContainer>
          <SelectorContainer isLast>
            <Selector
              onChange={handleChange('minutes')}
              referenceDate={date}
              value={date.getMinutes()}
              label={minuteLabel || 'Minute'}
              granularity={'minutes'}
              getDisplayValue={getDisplayedValue('minutes')}
            />
          </SelectorContainer>
        </Content>
      )}
      <Button color={'primary'} onPress={handlePressConfirm}>
        <Text colorVariant={'secondary'} colorTone={'xlight'}>
          {confirmButtonText || 'OK'}
        </Text>
      </Button>
    </Root>
  );
};

export default DateTimeSelector;
