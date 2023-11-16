import * as React from 'react';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import { ScrollableSelector } from '../ScrollableSelector';
import { DateTimeSelectorProps, Icon } from '@tecsinapse/react-core';
import { Calendar } from '../Calendar';
import { BackButton, Content, Header, Root } from './styled';

export type DateTimeSelectorMode = 'date' | 'time' | 'datetime' | 'month';

export interface NewDateTimeSelectorProps extends DateTimeSelectorProps {}

const NewDateTimeSelector: React.FC<NewDateTimeSelectorProps> = ({
  TextComponent = Text,
  value,
  onChange,
  mode,
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

  const isDate = mode === 'datetime' && currentMode === 0;

  const modalTitle = isDate ? dateModalTitle : timeModalTitle;
  const confirmButtonText = isDate
    ? dateConfirmButtonText
    : timeConfirmButtonText;

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

  const handleChange = (value?: Date) => {
    console.log(value);
    if (value) setDate(value);
  };

  const isMonth = mode === 'month';

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
        <Calendar type={'day'} value={date} onChange={handleChange} />
      ) : isMonth ? (
        <Content>
          <ScrollableSelector
            onChange={setDate}
            value={date}
            hourLabel={hourLabel}
            minuteLabel={minuteLabel}
            format={'MM-yyyy'}
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

export default NewDateTimeSelector;
