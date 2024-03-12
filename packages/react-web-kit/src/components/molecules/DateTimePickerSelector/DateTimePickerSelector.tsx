import * as React from 'react';
import { Button } from '../../atoms/Button';
import {
  Icon,
  Text,
  Calendar,
  ControlledSelectorComponentProps,
  DateTimeSelectorProps,
} from '@tecsinapse/react-core';
import { BackButton, Content, Root, Header } from './styled';
import { ScrollableTimePicker } from '../ScrollableTimePicker';
import { ScrollableMonthYearPicker } from '../ScrollableMonthYearPicker';

type DateTimePickerSelectorProps = ControlledSelectorComponentProps &
  DateTimeSelectorProps;

const DateTimePickerSelector: React.FC<DateTimePickerSelectorProps> = ({
  TextComponent = Text,
  currentMode,
  handlePressBack,
  modalTitle,
  isDate,
  date,
  handleCalendarChange,
  isMonth,
  setDate,
  handlePressConfirm,
  confirmButtonText,
  locale,
  yearLabel,
  monthLabel,
  hourLabel,
  minuteLabel,
  ...rest
}) => {
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
        <Calendar
          type={'day'}
          value={date}
          onChange={handleCalendarChange}
          year={date.getFullYear()}
          month={date.getMonth()}
        />
      ) : isMonth ? (
        <Content style={{ flexDirection: 'column' }}>
          <Content
            style={{ width: '100%', flexDirection: 'row', display: 'flex' }}
          >
            <ScrollableMonthYearPicker
              setDate={setDate}
              date={date}
              locale={locale}
              yearLabel={yearLabel}
              monthLabel={monthLabel}
            />
          </Content>
        </Content>
      ) : (
        <Content style={{ flexDirection: 'column' }}>
          <Content
            style={{ width: '100%', flexDirection: 'row', display: 'flex' }}
          >
            <ScrollableTimePicker
              setDate={setDate}
              date={date}
              locale={locale}
              hourLabel={hourLabel}
              minuteLabel={minuteLabel}
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

export default DateTimePickerSelector;
