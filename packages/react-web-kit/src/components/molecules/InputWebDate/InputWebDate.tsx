import * as React from 'react';
import { FlatList, ListRenderItemInfo, ViewProps } from 'react-native';
import { Button } from '../../atoms/Button';
import { TextProps } from '@tecsinapse/react-core/src/components/atoms/Text';
import {
  BackButton,
  Content,
  Root,
} from '@tecsinapse/react-core/src/components/molecules/DateTimeSelector/styled';
import { Header, Icon, RFValue, useTheme } from '@tecsinapse/react-core';
import { Calendar } from '@tecsinapse/react-core/src/components/molecules/Calendar';
import { Text } from '../../../../../react-native-kit/src/components/atoms/Text';
import TimeDigit from './components/TimeDigit.tsx';
import MemoizedYearCard from '@tecsinapse/react-core/src/components/molecules/Calendar/components/MemoizedYearCard';

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

const InputWebDate: React.FC<DateTimeSelectorProps> = ({
  TextComponent = Text,
  value,
  onChange,
  mode = 'datetime',
  locale,
  dateModalTitle,
  timeModalTitle,
  dateConfirmButtonText,
  timeConfirmButtonText,
  monthLabel,
  yearLabel,
  hourLabel,
  minuteLabel,
  minutesToShow = 60,
  firstMinute = 0,
  hoursToShow = 24,
  firstHour = 0,
  ...rest
}) => {
  const [date, setDate] = React.useState<Date>(value || new Date());
  const [currentMode, setCurrentMode] = React.useState<0 | 1>(0);

  const isDate =
    ['date'].includes(mode) || (mode === 'datetime' && currentMode === 0);

  const isMonth = mode === 'month';
  const theme = useTheme();

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
  const handleTimeChange = (newTime, updateType) => {
    console.log(typeof newTime);

    const newDate = new Date(date);

    if (updateType === 'hours') {
      newDate.setHours(Number(newTime));
    } else if (updateType === 'minutes') {
      newDate.setMinutes(Number(newTime));
    }
    setDate(newDate);
    onChange?.(newDate);
  };

  const getCurrentTimeUnit = unit => {
    const currentTime = date[unit === 'hours' ? 'getHours' : 'getMinutes']();
    return currentTime;
  };

  const minutes = React.useMemo(
    () =>
      Array.from({ length: (minutesToShow = 60) }, (_, i) => i + firstMinute),
    [minutesToShow, firstMinute]
  );

  const hours = React.useMemo(
    () => Array.from({ length: (hoursToShow = 23) }, (_, i) => i + firstHour),
    [hoursToShow, firstHour]
  );

  console.log('hours', hours);
  console.log('minutes', minutes);

  const yearsCardsBuilder = React.useCallback(
    (
      item: ListRenderItemInfo<number>,
      updateType: 'hours' | 'minutes',
      currentTime: number
    ) => (
      <MemoizedYearCard
        year={item}
        isSelected={currentTime === item}
        onPress={() => {
          console.log('onPress:', item, updateType);
          handleTimeChange(item, updateType);
        }}
        TextComponent={TextComponent}
      />
    ),
    [handleTimeChange, TextComponent]
  );

  const getInitialScrollIndex = (value, data) => {
    const selectedIndex = data.findIndex(item => item === value);
    return selectedIndex >= 0 ? selectedIndex : 0;
  };

  const digitCardHeight =
    RFValue(Number(theme.typography.base.fontSize.slice(0, -2))) +
    2 * RFValue(Number(theme.spacing.deca.slice(0, -2)));

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
      ) : (
        <Content style={{ width: 150, flexDirection: 'column' }}>
          <TextComponent typography={'base'} colorVariant={'secondary'}>
            {`Horas:Minutos`}
          </TextComponent>
          <Content
            style={{ width: '100%', flexDirection: 'row', display: 'flex' }}
          >
            <TimeDigit
              style={{ overflowY: 'scroll', height: '100px', width: 10 }}
              data={hours}
              updateType={'hours'}
              currentTime={getCurrentTimeUnit('hours')}
              renderItem={item =>
                yearsCardsBuilder(
                  item,
                  'hours',
                  getCurrentTimeUnit('hours'),
                  onChange
                )
              }
              yearCardsBuilder={yearsCardsBuilder}
              keyExtractor={item => String(item)}
              currentTimeUnit={getCurrentTimeUnit('hours')}
              contentContainerStyle={{
                alignItems: 'center',
              }}
              numColumns={1}
              initialScrollIndex={getInitialScrollIndex(date.getHours(), hours)}
              getItemLayout={(_, index) => ({
                length: digitCardHeight,
                offset: digitCardHeight * index,
                index,
              })}
              fadingEdgeLength={200}
            />
            <TimeDigit
              style={{ overflowY: 'scroll', height: '100px', width: 10 }}
              data={minutes}
              updateType={'minutes'}
              currentTime={getCurrentTimeUnit('minutes')}
              yearCardsBuilder={yearsCardsBuilder}
              renderItem={item =>
                yearsCardsBuilder(
                  item,
                  'minutes',
                  getCurrentTimeUnit('minutes'),
                  onChange
                )
              }
              keyExtractor={item => String(item)}
              contentContainerStyle={{
                alignItems: 'center',
              }}
              numColumns={1}
              initialScrollIndex={getInitialScrollIndex(
                date.getMinutes(),
                minutes
              )}
              currentTimeUnit={getCurrentTimeUnit('minutes')}
              getItemLayout={(_, index) => ({
                length: digitCardHeight,
                offset: digitCardHeight * index,
                index,
              })}
              fadingEdgeLength={200}
            />
          </Content>
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

export default InputWebDate;
