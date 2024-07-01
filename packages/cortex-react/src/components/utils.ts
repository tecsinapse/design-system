import { CalendarDate, getLocalTimeZone } from '@internationalized/date';

export const getNameInitials = (name: string) => {
  const nameSplit = name.split(' ');
  const length = nameSplit.length;
  if (length > 1) {
    return `${nameSplit[0][0]}${nameSplit[length - 1][0]}`;
  }
  return name[0];
};

export const dateToCalendarDate = (value?: Date) => {
  return new CalendarDate(
    value?.getFullYear() ?? new Date().getFullYear(),
    value?.getMonth() ? value.getMonth() + 1 : new Date().getMonth() + 1,
    value?.getDate() ?? new Date().getDate()
  );
};

export const calendarDateToDate = (value: CalendarDate) => {
  return value.toDate(getLocalTimeZone());
};
