import { CalendarDate, getLocalTimeZone } from '@internationalized/date';

export const dateToCalendarDate = (value?: Date) => {
  return new CalendarDate(
    value?.getFullYear() ?? new Date().getFullYear(),
    value?.getMonth() !== undefined
      ? value.getMonth() + 1
      : new Date().getMonth() + 1,
    value?.getDate() ?? new Date().getDate()
  );
};

export const calendarDateToDate = (value: CalendarDate) => {
  return value.toDate(getLocalTimeZone());
};
