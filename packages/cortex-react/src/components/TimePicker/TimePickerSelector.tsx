import { Time } from '@internationalized/date';
import React, { useMemo } from 'react';
import { ScrollableDigitSelector } from '../ScrollableDigitSelector';
import clsx from 'clsx';
import { Button } from '../Button';
import { MdClose } from 'react-icons/md';

interface TimePickerSelectorProps {
  value: Time;
  hourCycle: 12 | 24;
  minuteInterval: number;
  onPressOkButton: () => void;
  onChangeTime: (time: Time) => void;
  hourLabel?: string;
  minuteLabel?: string;
  dayPeriodLabel?: string;
}

const dayPeriodStyle =
  'p-micro rounded-micro border-1 border-transparent hover:bg-primary-light hover:border-primary cursor-pointer';

export const TimePickerSelector = ({
  value,
  hourCycle,
  minuteInterval,
  onPressOkButton,
  onChangeTime,
  hourLabel = 'Hour',
  minuteLabel = 'Minute',
  dayPeriodLabel = 'Day Period',
}: TimePickerSelectorProps) => {
  const handleHourChange = (hour: number) => {
    let newHour = hour;
    if (hourCycle === 12) {
      if (isPM && newHour < 12) {
        newHour += 12;
      } else if (!isPM && newHour >= 12) {
        newHour -= 12;
      }
    }
    const newTime = new Time(newHour, value.minute, value.second);
    onChangeTime(newTime);
  };

  const handleMinuteChange = (minute: number) => {
    const newTime = new Time(value.hour, minute, value.second);
    onChangeTime(newTime);
  };

  const handlePeriodChange = (isPM: boolean) => {
    if (value === undefined) return;

    let newHour = value.hour;
    if (hourCycle === 12) {
      if (isPM && newHour < 12) {
        newHour += 12;
      } else if (!isPM && newHour >= 12) {
        newHour -= 12;
      }
    }
    const newTime = new Time(newHour, value.minute, value.second);
    onChangeTime(newTime);
  };

  const isPM = value && value?.hour >= 12;

  const displayHour = useMemo(() => {
    if (value === undefined) return 0;
    return hourCycle === 12
      ? value.hour === 0
        ? 12
        : value.hour > 12
          ? value.hour - 12
          : value.hour
      : value.hour;
  }, [value, hourCycle]);

  return (
    <>
      <div className="flex justify-end">
        <Button
          className="p-micro"
          variants={{
            size: 'circle',
            variant: 'outline',
          }}
          onClick={onPressOkButton}
        >
          <MdClose />
        </Button>
      </div>
      <div className="flex flex-row gap-x-deca max-h-[300px] overflow-hidden">
        <div className="min-w-7 flex flex-col gap-y-micro p-micro">
          <span className="text-base font-bold text-center">{hourLabel}</span>
          <ScrollableDigitSelector
            value={displayHour}
            onChange={handleHourChange}
            min={hourCycle === 12 ? 1 : 0}
            max={hourCycle === 12 ? 12 : 23}
          />
        </div>
        <div className="min-w-7 flex flex-col gap-y-micro p-micro">
          <span className="text-base font-bold text-center">{minuteLabel}</span>
          <ScrollableDigitSelector
            value={value?.minute ?? 0}
            onChange={handleMinuteChange}
            min={0}
            max={59}
            step={minuteInterval}
          />
        </div>
        {hourCycle === 12 && (
          <div className="min-w-7 flex flex-col gap-y-micro p-micro">
            <span className="text-base font-bold text-center">
              {dayPeriodLabel}
            </span>
            <div className="flex flex-col gap-y-micro p-micro overflow-auto">
              <div
                onClick={() => handlePeriodChange(false)}
                className={'flex justify-center'}
              >
                <span
                  className={clsx(
                    dayPeriodStyle,
                    !isPM && 'bg-primary-medium text-light'
                  )}
                >
                  AM
                </span>
              </div>
              <div
                onClick={() => handlePeriodChange(true)}
                className={'flex justify-center'}
              >
                <span
                  className={clsx(
                    dayPeriodStyle,
                    isPM && 'bg-primary-medium text-light'
                  )}
                >
                  PM
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
