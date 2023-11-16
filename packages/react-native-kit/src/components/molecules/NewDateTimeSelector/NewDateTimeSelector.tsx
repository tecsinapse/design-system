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
  mode = 'date',
  locale,
  upperDateThreshold: _upperDateThreshold,
  lowerDateThreshold: _lowerDateThreshold,
  offsetThreshold,
  upperOffsetThreshold,
  lowerOffsetThreshold,
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
    ['date', 'month'].includes(mode) ||
    (mode === 'datetime' && currentMode === 0);

  const modalTitle = isDate ? dateModalTitle : timeModalTitle;
  const confirmButtonText = isDate
    ? dateConfirmButtonText
    : timeConfirmButtonText;

  const handlePressConfirm = () => {
    if (mode === 'datetime' && currentMode === 0) {
      setCurrentMode(1);
    } else {
      console.log('onChange', date);
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
      {/*TODO: mode month*/}
      {isDate ? (
        <Calendar type={'day'} value={date} onChange={handleChange} />
      ) : (
        <Content>
          <ScrollableSelector
            onChange={setDate}
            value={value}
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
