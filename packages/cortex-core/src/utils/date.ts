import {
  add,
  compareAsc,
  format,
  getDaysInMonth,
  getWeeksInMonth,
  isSameDay,
  isSameMonth,
  isSameYear,
  set,
  sub,
} from 'date-fns';
import type { Locale } from 'date-fns';
import * as locales from 'date-fns/locale';

export type { Locale };

/**
 * Resolves a locale identifier string into a date-fns v4 Locale object.
 * Platform-agnostic: native consumers pass the RN `I18nManager` locale
 * identifier; web consumers can pass `navigator.language`. Defaults to
 * `pt_BR`.
 */
export const getLocale = (code?: string): Locale => {
  const normalized = (code ?? 'pt_BR').replace(/[_-]/g, '');
  return (locales as Record<string, Locale>)[normalized] ?? locales.ptBR;
};

/**
 * Builds the 6x7 calendar grid (weeks x weekdays) for the month containing
 * `referenceDate`, padding with days from adjacent months. This is the core
 * calendar-math shared by the web and native calendars.
 */
export const getCalendarGrid = (
  referenceDate: Date,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0
): Date[][] => {
  const startingWeekDay =
    referenceDate.getDay() === 0 ? 0 : referenceDate.getDay() - weekStartsOn;
  const weeksInMonth = getWeeksInMonth(referenceDate, { weekStartsOn });

  return [...Array(6).keys()].map(week =>
    [...Array(7).keys()].map(weekDayIndex => {
      let addDays = 6 * week + week + weekDayIndex - startingWeekDay;
      if (weeksInMonth === 5 && startingWeekDay === 0) addDays -= 7;
      return add(referenceDate, { days: addDays });
    })
  );
};

export {
  add,
  compareAsc,
  format,
  getDaysInMonth,
  getWeeksInMonth,
  isSameDay,
  isSameMonth,
  isSameYear,
  set,
  sub,
};
