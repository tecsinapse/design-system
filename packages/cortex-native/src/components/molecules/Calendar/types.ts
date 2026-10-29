export type SelectionType = 'range' | 'day';

export type DateRange = { lowest?: Date; highest?: Date };

export type Value<T extends SelectionType> = T extends 'range'
  ? DateRange
  : Date;
