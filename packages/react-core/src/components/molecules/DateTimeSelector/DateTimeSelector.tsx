import { format as formatDate } from 'date-fns';
import * as React from 'react';
import { ptBR } from 'date-fns/locale';
import { View, ViewProps } from 'react-native';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Text, TextProps } from '../../atoms/Text';
import { Granularity, Selector } from './Selector';
import { BackButton, Content, Header, Root, SelectorContainer } from './styled';
import { Calendar } from '../Calendar';
import ScrollableSelector from '../ScrollableSelector/ScrollableSelector';

export type DateTimeSelectorMode = 'date' | 'time' | 'datetime' | 'month';

export interface DateTimeSelectorProps extends ViewProps {
  TextComponent?: React.FC<TextProps>;
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

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  TextComponent = Text,
  value,
  onChange,
  mode = 'month',
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

  const isDate =
    ['date'].includes(mode) || (mode === 'datetime' && currentMode === 0);

  const isMonth = mode === 'month';

  const modalTitle = isDate
    ? dateModalTitle
    : isMonth
    ? dateModalTitle
    : timeModalTitle;
  const confirmButtonText = isDate
    ? dateConfirmButtonText
    : timeConfirmButtonText;

  const handleCalendarChange = (value: Date | undefined) => {
    if (value !== undefined) {
      setDate(value);
    }
  };

  const getDisplayedValue = (granularity: Granularity) => (value: number) => {
    return granularity === 'month'
      ? formatDate(date, 'MMM', { locale: locale }).slice(0, 3)
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
        <TextComponent typography={'base'} colorVariant={'secondary'}>
          {modalTitle}
        </TextComponent>
      </Header>

      {isDate ? (
        <Calendar type={'day'} value={date} onChange={handleCalendarChange} />
      ) : isMonth ? (
        <Content>
          <ScrollableSelector
            locale={locale}
            value={date}
            onChange={value => setDate(value)}
            format="MM-yyyy"
            TextComponent={TextComponent}
            markWidth={50}
            markHeight={40}
            markColor={'rgba(0, 0, 0, 0.05)'}
          />
        </Content>
      ) : (
        <Content>
          <ScrollableSelector
            locale={locale}
            value={date}
            onChange={value => setDate(value)}
            format="HH-mm"
            TextComponent={TextComponent}
            markWidth={50}
            markHeight={40}
            markColor={'rgba(0, 0, 0, 0.05)'}
          />
        </Content>
      )}
      <Button color={'primary'} onPress={handlePressConfirm}>
        <TextComponent fontWeight="bold" fontColor="light">
          {confirmButtonText || 'OK'}
        </TextComponent>
      </Button>
    </Root>
  );
};

export default DateTimeSelector;
