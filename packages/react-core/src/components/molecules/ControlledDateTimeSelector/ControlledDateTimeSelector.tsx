import * as React from 'react';
import { DateTimeSelectorProps } from '../DateTimeSelector';
import { Dispatch, SetStateAction } from 'react';

export interface ControlledDateTimeSelectorProps extends DateTimeSelectorProps {
  SelectorComponent: React.FC<ControlledSelectorComponentProps>;
}

export interface ControlledSelectorComponentProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  currentMode: number;
  isDate: boolean;
  isMonth: boolean;
  handlePressConfirm: () => void;
  handlePressBack: () => void;
  handleCalendarChange: (value?: Date) => void;
  modalTitle?: string;
  confirmButtonText?: string;
}

const ControlledDateTimeSelector: React.FC<ControlledDateTimeSelectorProps> = ({
  SelectorComponent,
  ...rest
}) => {
  const {
    value,
    mode,
    dateModalTitle,
    dateConfirmButtonText,
    timeModalTitle,
    timeConfirmButtonText,
    onChange,
  } = rest;
  const [date, setDate] = React.useState<Date>(value || new Date());
  const [currentMode, setCurrentMode] = React.useState<0 | 1>(0);

  const isDate = mode === 'date' || (mode === 'datetime' && currentMode === 0);
  const isMonth = mode === 'month';

  const modalTitle = isDate || isMonth ? dateModalTitle : timeModalTitle;

  const confirmButtonText =
    isDate || isMonth ? dateConfirmButtonText : timeConfirmButtonText;

  const handleCalendarChange = (value: Date | undefined) => {
    if (value !== undefined) {
      const referenceDate = value;
      referenceDate.setHours(date.getHours(), date.getMinutes());
      setDate(referenceDate);
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
    <SelectorComponent
      {...rest}
      handlePressBack={handlePressBack}
      handlePressConfirm={handlePressConfirm}
      handleCalendarChange={handleCalendarChange}
      confirmButtonText={confirmButtonText}
      isDate={isDate}
      isMonth={isMonth}
      date={date}
      setDate={setDate}
      currentMode={currentMode}
      modalTitle={modalTitle}
    />
  );
};

export default ControlledDateTimeSelector;
