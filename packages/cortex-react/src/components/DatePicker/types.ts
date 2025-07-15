import { Granularity } from '@react-types/datepicker';

export interface BaseDatePickerInputProps {
  /** Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale. */
  hourCycle?: 12 | 24;
  /** Determines the smallest unit that is displayed in the date picker. By default, this is 'day' for dates, and 'minute' for times. */
  granularity?: Granularity;
  isTodayHighlited?: boolean;
  minValue?: Date;
  maxValue?: Date;
}
