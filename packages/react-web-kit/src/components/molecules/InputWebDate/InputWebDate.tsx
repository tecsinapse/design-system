import * as React from 'react';
import { ViewProps } from 'react-native';
import { Button } from '../../atoms/Button';
import {
  BackButton,
  Content,
  Root,
} from '@tecsinapse/react-core/src/components/molecules/DateTimeSelector/styled';
import {
  Header,
  Icon,
  Text,
  Calendar,
  TextProps,
} from '@tecsinapse/react-core';
//BACKBUTTON, CONTENT, ROOT PRA WEB - STYLED DIV

import { ScrollableTimePicker } from '../ScrollableTimePicker';
import { ScrollableMonthYearPicker } from '../ScrollableMonthYearPicker';

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
  mode,
  dateModalTitle,
  timeModalTitle,
  dateConfirmButtonText,
  timeConfirmButtonText,
  yearLabel,
  monthLabel,
  hourLabel,
  minuteLabel,
  requestCloseSelector,
  ...rest
}) => {
  const [date, setDate] = React.useState<Date>(value || new Date());
  const [currentMode, setCurrentMode] = React.useState<0 | 1>(0);

  const isDate = mode === 'date' || (mode === 'datetime' && currentMode === 0);
  const isMonth = mode === 'month';

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
    } else {
      onChange?.(date);
      requestCloseSelector();
    }
  };

  const handlePressBack = () => {
    setCurrentMode(0);
  };

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
      ) : isMonth ? (
        <Content style={{ width: 150, flexDirection: 'column' }}>
          <Content
            style={{ width: '100%', flexDirection: 'row', display: 'flex' }}
          >
            <ScrollableMonthYearPicker setDate={setDate} date={date} />
          </Content>
        </Content>
      ) : (
        <Content style={{ width: 150, flexDirection: 'column' }}>
          <Content
            style={{ width: '100%', flexDirection: 'row', display: 'flex' }}
          >
            <ScrollableTimePicker setDate={setDate} date={date} />
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
