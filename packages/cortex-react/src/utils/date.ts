import {
  CalendarDateTime,
  getLocalTimeZone,
  Time,
} from '@internationalized/date';
import { TimeValue } from 'react-aria';

export const dateToCalendarDateTime = (value?: Date) => {
  return new CalendarDateTime(
    value?.getFullYear() ?? new Date().getFullYear(),
    value?.getMonth() !== undefined
      ? value.getMonth() + 1
      : new Date().getMonth() + 1,
    value?.getDate() ?? new Date().getDate(),
    value?.getHours() ?? new Date().getHours(),
    value?.getMinutes() ?? new Date().getMinutes(),
    value?.getSeconds() ?? new Date().getSeconds()
  );
};

export const calendarDateToDate = (value?: CalendarDateTime | null) => {
  if (!value) return undefined;
  return value.toDate(getLocalTimeZone());
};

export const timeFromTimeValue = (value?: TimeValue | null) => {
  if (!value) return undefined;
  return new Time(value.hour, value.minute, value.second, value.millisecond);
};
