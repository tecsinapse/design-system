import * as React from 'react';
import { ViewProps } from 'react-native';
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
import MemoizedTimeCard from './components/MemoizedTimeCard.tsx';

export type DateTimeSelectorMode = 'date' | 'time' | 'datetime' | 'month';

export interface DateTimeSelectorProps extends ViewProps {
  TextComponent?: React.FC<TextProps>;
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
  requestCloseSelector: () => void;
}

const InputWebDate: React.FC<DateTimeSelectorProps> = ({
  TextComponent = Text,
  value,
  onChange,
  mode = 'datetime',
  dateModalTitle,
  timeModalTitle,
  dateConfirmButtonText,
  timeConfirmButtonText,
  hourLabel,
  minuteLabel,
  requestCloseSelector,
  ...rest
}) => {
  const [date, setDate] = React.useState<Date>(value || new Date());
  const [currentMode, setCurrentMode] = React.useState<0 | 1>(0);
  const minutesToShow = 60;
  const firstMinute = 0;
  const hoursToShow = 24;
  const firstHour = 0;

  const isDate =
    ['date'].includes(mode) || (mode === 'datetime' && currentMode === 0);

  const theme = useTheme();

  const modalTitle = isDate ? dateModalTitle : timeModalTitle;

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
    }
    if (mode === 'datetime' && currentMode === 1) {
      onChange?.(date);
      requestCloseSelector();
    }
  };

  const handlePressBack = () => {
    setCurrentMode(0);
  };
  const handleTimeChange = (newTime, updateType) => {
    const newDate = new Date(date);

    if (updateType === 'hours') {
      newDate.setHours(Number(newTime));
    } else if (updateType === 'minutes') {
      newDate.setMinutes(Number(newTime));
    }
    setDate(newDate);
  };

  const getCurrentTimeUnit = unit => {
    const currentTime = date[unit === 'hours' ? 'getHours' : 'getMinutes']();
    return currentTime;
  };

  const minutes = React.useMemo(
    () => Array.from({ length: minutesToShow }, (_, i) => i + firstMinute),
    [minutesToShow, firstMinute]
  );

  const hours = React.useMemo(
    () => Array.from({ length: hoursToShow }, (_, i) => i + firstHour),
    [hoursToShow, firstHour]
  );

  const getDisplayedValue = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  const timeCardsBuilder = React.useCallback(
    (item: number, updateType: 'hours' | 'minutes', currentTime: number) => (
      <MemoizedTimeCard
        time={getDisplayedValue(item)}
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
          <BackButton onPress={handlePressBack} style={{ top: -15, left: -10 }}>
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
          <Content
            style={{ width: '100%', flexDirection: 'row', display: 'flex' }}
          >
            <TimeDigit
              data={hours}
              updateType={'hours'}
              timeLabel={'Hour'}
              currentTime={getCurrentTimeUnit('hours')}
              renderItem={item =>
                timeCardsBuilder(item, 'hours', getCurrentTimeUnit('hours'))
              }
              timeCardsBuilder={timeCardsBuilder}
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
              data={minutes}
              updateType={'minutes'}
              currentTime={getCurrentTimeUnit('minutes')}
              timeCardsBuilder={timeCardsBuilder}
              timeLabel={'Minute'}
              renderItem={item =>
                timeCardsBuilder(item, 'minutes', getCurrentTimeUnit('minutes'))
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
