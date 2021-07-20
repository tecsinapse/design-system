import * as React from 'react';
import { View, ViewProps } from 'react-native';
import {
  Title,
  Content,
  StyledSelector,
  Root,
  Control,
  BackButton,
  Header,
  Dummy,
} from './styled';
import { Granularity } from './Selector';
import { getDaysInMonth, set, format as formatDate } from 'date-fns';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import { Icon } from '../../atoms/Icon';

export type DateTimeSelectorMode = 'date' | 'time' | 'datetime';

export interface DateTimeSelectorProps extends ViewProps {
  value?: Date;
  onChange?: (value: Date) => void | never;
  mode?: DateTimeSelectorMode;
  format?: string;
  locale?: Locale;

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

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  value,
  onChange,
  mode = 'date',
  format,
  locale,
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
  const [date, setDate] = React.useState<Date>(value || new Date());
  const [currentMode, setCurrentMode] = React.useState<0 | 1>(0);
  const isDate = mode === 'date' || (mode === 'datetime' && currentMode === 0);

  const modalTitle = isDate ? dateModalTitle : timeModalTitle;
  const confirmButtonText = isDate
    ? dateConfirmButtonText
    : timeConfirmButtonText;

  const handleChange = (granularity: Granularity) => (newValue: number) => {
    setDate(date => {
      // Months and years must have a different handling for being
      // the only date units that may interfere another unit.
      if (['month', 'year'].includes(granularity)) {
        let newDate = set(date, { [granularity]: newValue });
        const daysInMonth = getDaysInMonth(newDate);
        if (granularity === 'year' && date.getMonth() != newDate.getMonth()) {
          newDate = set(newDate, { month: date.getMonth() });
          return set(newDate, { date: getDaysInMonth(newDate) });
        }
        return daysInMonth < date.getDate()
          ? set(newDate, { date: daysInMonth })
          : newDate;
      } else {
        return set(date, { [granularity]: newValue });
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
          <StyledSelector
            isFirst
            onChange={handleChange('date')}
            referenceDate={date}
            value={date.getDate()}
            label={dayLabel || 'Day'}
            granularity={'date'}
            getDisplayValue={getDisplayedValue('date')}
          />
          <StyledSelector
            onChange={handleChange('month')}
            referenceDate={date}
            value={date.getMonth()}
            label={monthLabel || 'Month'}
            granularity={'month'}
            getDisplayValue={getDisplayedValue('month')}
          />
          <StyledSelector
            isLast
            onChange={handleChange('year')}
            referenceDate={date}
            value={date.getFullYear()}
            label={yearLabel || 'Year'}
            granularity={'year'}
            getDisplayValue={getDisplayedValue('year')}
          />
        </Content>
      ) : (
        <Content>
          <StyledSelector
            isFirst
            onChange={handleChange('hours')}
            referenceDate={date}
            value={date.getHours()}
            label={hourLabel || 'Hour'}
            granularity={'hours'}
            getDisplayValue={getDisplayedValue('hours')}
          />
          <StyledSelector
            isLast
            onChange={handleChange('minutes')}
            referenceDate={date}
            value={date.getMinutes()}
            label={minuteLabel || 'Minute'}
            granularity={'minutes'}
            getDisplayValue={getDisplayedValue('minutes')}
          />
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
