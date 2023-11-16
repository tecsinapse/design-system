import * as React from 'react';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import { ScrollableSelector } from '../ScrollableSelector';
import { DateTimeSelectorProps, Icon } from '@tecsinapse/react-core';
import { Calendar } from '../Calendar';
import { BackButton, Content, Header, Root } from './styled';
import { getLocale } from '../../../utils/date';

export interface NewDateTimeSelectorProps extends DateTimeSelectorProps {}

const DateTimeSelector: React.FC<NewDateTimeSelectorProps> = ({
  TextComponent = Text,
  value,
  onChange,
  mode,
  dateModalTitle,
  timeModalTitle,
  dateConfirmButtonText,
  timeConfirmButtonText,
  hourLabel,
  minuteLabel,
  locale,
  ...rest
}) => {
  const [date, setDate] = React.useState<Date>(value ?? new Date());
  const [currentMode, setCurrentMode] = React.useState<0 | 1>(0);

  const isDate =
    (mode === 'datetime' && currentMode === 0) ||
    (mode === 'date' && currentMode === 0);
  const isMonth = mode === 'month';

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
    if (value) setDate(value);
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
        <Calendar type={'day'} value={date} onChange={handleChange} />
      ) : isMonth ? (
        <Content>
          <ScrollableSelector
            onChange={setDate}
            value={date}
            hourLabel={hourLabel}
            minuteLabel={minuteLabel}
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

export default DateTimeSelector;
