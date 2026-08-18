import {
  add,
  compareAsc,
  format,
  getCalendarGrid,
  getDaysInMonth,
  getLocale,
  getWeeksInMonth,
  isSameDay,
  isSameMonth,
  isSameYear,
  set,
  sub,
} from '@tecsinapse/cortex-core';

describe('date-fns v4 smoke (surface exposed via @tecsinapse/cortex-core)', () => {
  const base = new Date(2026, 7, 15, 12, 30, 45); // Aug 15 2026

  it('add / sub keep v4 semantics', () => {
    expect(add(base, { months: 1 }).getMonth()).toBe(8);
    expect(sub(base, { days: 5 }).getDate()).toBe(10);
  });

  it('set applies the requested unit', () => {
    expect(set(base, { date: 1 }).getDate()).toBe(1);
  });

  it('compareAsc / isSameDay / isSameMonth / isSameYear', () => {
    expect(compareAsc(base, new Date(2026, 7, 16))).toBe(-1);
    expect(isSameDay(base, new Date(2026, 7, 15))).toBe(true);
    expect(isSameMonth(base, new Date(2026, 7, 1))).toBe(true);
    expect(isSameYear(base, new Date(2026, 0, 1))).toBe(true);
  });

  it('getDaysInMonth / getWeeksInMonth', () => {
    expect(getDaysInMonth(new Date(2026, 7, 1))).toBe(31);
    expect(getWeeksInMonth(new Date(2026, 7, 1), { weekStartsOn: 0 })).toBe(6);
  });

  it('format uses v4 tokens (yyyy / MMM / EEE)', () => {
    expect(format(base, 'yyyy-MM-dd')).toBe('2026-08-15');
    expect(format(base, 'MMM yyyy')).toBe('Aug 2026');
    expect(format(base, 'EEE')).toBe('Sat');
  });

  it('getLocale resolves identifiers to a Locale object', () => {
    expect(getLocale('pt_BR')).toBeDefined();
    expect(getLocale('en_US')).toBeDefined();
    expect(getLocale()).toBeDefined();
  });

  it('getCalendarGrid builds a 6x7 grid for a known month/year', () => {
    const grid = getCalendarGrid(new Date(2026, 7, 1), 0);
    expect(grid).toHaveLength(6);
    grid.forEach(week => expect(week).toHaveLength(7));
    expect(grid[0][0].getMonth()).toBe(6); // Jul padding
    expect(grid[0][0].getDate()).toBe(26);
    expect(grid[5][6].getMonth()).toBe(8); // Sep overflow
  });
});
