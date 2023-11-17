import * as React from 'react';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import { ScrollableSelector } from '../ScrollableSelector';
import {
  ControlledSelectorComponentProps,
  DateTimeSelectorProps,
  Icon,
} from '@tecsinapse/react-core';
import { Calendar } from '../Calendar';
import { BackButton, Content, Header, Root } from './styled';
import { getLocale } from '../../../utils/date';

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
        <Content>
          <ScrollableSelector
            onChange={setDate}
            value={date}
            yearLabel={yearLabel}
            monthLabel={monthLabel}
            format={'MM-yyyy'}
            locale={locale ?? getLocale()}
          />
        </Content>
      ) : (
        <Content>
          <ScrollableSelector
            onChange={setDate}
            value={date}
            hourLabel={hourLabel}
            minuteLabel={minuteLabel}
            format={'HH-mm'}
            locale={locale ?? getLocale()}
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

export default DateTimePickerSelector;
