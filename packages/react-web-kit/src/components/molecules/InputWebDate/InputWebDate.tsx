import * as React from 'react';
import { Button } from '../../atoms/Button';
import {
  Header,
  Icon,
  Text,
  Calendar,
  DateTimeSelectorProps,
} from '@tecsinapse/react-core';
import { BackButton, Content, Root } from './styled';

import { ScrollableTimePicker } from '../ScrollableTimePicker';
import { ScrollableMonthYearPicker } from '../ScrollableMonthYearPicker';

export type DateTimeSelectorMode = 'date' | 'time' | 'datetime' | 'month';

export interface InputWebDateProps extends DateTimeSelectorProps {}

const InputWebDate: React.FC<InputWebDateProps> = ({
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
        <Content style={{ flexDirection: 'column' }}>
          <Content
            style={{ width: '100%', flexDirection: 'row', display: 'flex' }}
          >
            <ScrollableMonthYearPicker setDate={setDate} date={date} />
          </Content>
        </Content>
      ) : (
        <Content style={{ flexDirection: 'column' }}>
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
