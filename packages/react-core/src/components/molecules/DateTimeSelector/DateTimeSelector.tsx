import * as React from 'react';
import { View, ViewProps } from 'react-native';
import { Title, Content, StyledSelector } from './styled';
import { Granularity } from './Selector';
import { getDaysInMonth, set, format as formatDate } from 'date-fns';

export type DateTimeSelectorMode = 'date' | 'time' | 'datetime';

export interface DateTimeSelectorProps extends ViewProps {
  value?: Date;
  onChange?: (value: Date) => void | never;
  mode?: DateTimeSelectorMode;
  format?: string;
  locale?: Locale;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  value,
  onChange,
  mode = 'date',
  format,
  locale,
  ...rest
}) => {
  const [date, setDate] = React.useState<Date>(value || new Date());
  const [currentMode, setCurrentMode] = React.useState<0 | 1>(0);
  const isDate = mode === 'date' || (mode === 'datetime' && currentMode === 0);

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

  return (
    <View {...rest}>
      <Title>Selecione a data desejada:</Title>
      {isDate ? (
        <Content>
          <StyledSelector
            onChange={handleChange('date')}
            referenceDate={date}
            value={date.getDate()}
            label={'Dia'}
            granularity={'date'}
            getDisplayValue={getDisplayedValue('date')}
          />
          <StyledSelector
            onChange={handleChange('month')}
            referenceDate={date}
            value={date.getMonth()}
            label={'Mês'}
            granularity={'month'}
            getDisplayValue={getDisplayedValue('month')}
          />
          <StyledSelector
            onChange={handleChange('year')}
            referenceDate={date}
            value={date.getFullYear()}
            label={'Ano'}
            granularity={'year'}
            getDisplayValue={getDisplayedValue('year')}
          />
        </Content>
      ) : (
        <Content>
          <StyledSelector
            onChange={handleChange('hours')}
            referenceDate={date}
            value={date.getHours()}
            label={'Hora'}
            granularity={'hours'}
            getDisplayValue={getDisplayedValue('hours')}
          />
          <StyledSelector
            onChange={handleChange('minutes')}
            referenceDate={date}
            value={date.getMinutes()}
            label={'Minuto'}
            granularity={'minutes'}
            getDisplayValue={getDisplayedValue('minutes')}
          />
        </Content>
      )}
    </View>
  );
};

export default DateTimeSelector;
