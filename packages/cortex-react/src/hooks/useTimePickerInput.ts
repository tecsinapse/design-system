import { useCallback, useState } from 'react';
import { usePopoverContext } from '../components/Popover/Context';
import { Time } from '@internationalized/date';
import { TimeValue } from 'react-aria';

interface useTimePickerInputProps {
  value?: Time;
  onChange?: (value?: Time) => void;
  hourCycle: 12 | 24;
  minuteInterval: number;
  disabled?: boolean;
  granularity: 'hour' | 'minute' | 'second';
}

export const useTimePickerInput = ({
  value,
  onChange,
  minuteInterval,
}: useTimePickerInputProps) => {
  const { setIsOpen } = usePopoverContext();
  const [popoverTime, setPopoverTime] = useState<Time>(value ?? new Time(0, 0));

  const handleTimeFieldChange = (newValue: TimeValue | null) => {
    if (newValue && minuteInterval > 1) {
      const time = newValue as Time;
      const adjustedMinute =
        (Math.round(time.minute / minuteInterval) * minuteInterval) % 60;
      const adjustedTime = time.set({ minute: adjustedMinute });
      onChange?.(adjustedTime);
      setPopoverTime(adjustedTime);
      return;
    }
    const newTime = newValue
      ? new Time(newValue.hour, newValue.minute, newValue.second)
      : undefined;
    onChange?.(newTime);
    setPopoverTime(newTime ?? new Time(0, 0));
  };

  const handleTogglePopover = useCallback(() => {
    setIsOpen(open => !open);
  }, []);

  const handleChangeTimeOnSelector = useCallback(
    (time: Time) => {
      setPopoverTime(time);
      handleTimeFieldChange(time);
    },
    [handleTimeFieldChange]
  );

  return {
    handleTogglePopover,
    handleTimeFieldChange,
    handleChangeTimeOnSelector,
    popoverTime,
  };
};
