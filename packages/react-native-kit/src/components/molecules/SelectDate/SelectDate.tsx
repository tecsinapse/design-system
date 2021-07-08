import * as React from 'react';
import { SelectNativeProps } from '@tecsinapse/react-native-kit';
import { Select } from '../../atoms/Select';
import {
  format as formatDate,
  parse,
  add,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  set,
} from 'date-fns';

type DateOption = {
  offset: number;
  formatted: string;
};

type Granularity = 'days' | 'months' | 'years';

export interface SelectDateProps
  extends Omit<
    SelectNativeProps<DateOption, 'single'>,
    | 'options'
    | 'onSelect'
    | 'value'
    | 'type'
    | 'keyExtractor'
    | 'labelExtractor'
    | 'flatListProps'
  > {
  value?: string;
  onSelect?: (value?: string) => void | never;
  lowerDateThreshold?: string;
  upperDateThreshold?: string;
  lowerOffsetThreshold?: number;
  upperOffsetThreshold?: number;
  offsetThreshold?: number;
  granularity?: Granularity;

  /** The Date format. Defaults to MM/YYYY */
  format?: string;
}

function getDiffFromToday(date: Date, granularity: Granularity) {
  const now = new Date();
  const midnight = { hours: 0, minutes: 0, milliseconds: 0 };
  if (granularity === 'days') {
    return differenceInDays(date, set(now, midnight));
  } else if (granularity === 'months') {
    return date.getMonth() - now.getMonth();
  } else {
    return date.getFullYear() - now.getFullYear();
  }
}

function offsetToDate(offset: number, granularity: Granularity): Date {
  return add(new Date(), { [granularity]: offset });
}

function getOptionsFromOffset(
  format: string,
  offset: number,
  amount: number,
  granularity: Granularity,
  upperOffsetThreshold?: number,
  lowerOffsetThreshold?: number
): DateOption[] {
  return [...Array(amount).keys()].reduce((acc: DateOption[], index) => {
    const unit = index - Math.ceil(amount / 2) + 1;
    const currentOffset = offset + unit;
    if (
      (!lowerOffsetThreshold || currentOffset >= lowerOffsetThreshold) &&
      (!upperOffsetThreshold || currentOffset <= upperOffsetThreshold)
    ) {
      acc.push({
        offset: offset + unit,
        formatted: formatDate(
          add(new Date(), {
            [granularity]: offset + unit,
          }),
          format
        ),
      });
    }
    return acc;
  }, []);
}

const SelectDate: React.FC<SelectDateProps> = ({
  value: _value,
  onSelect,
  offsetThreshold,
  lowerDateThreshold,
  upperDateThreshold,
  lowerOffsetThreshold: _lowerOffsetThreshold,
  upperOffsetThreshold: _upperOffsetThreshold,
  granularity = 'months',
  format = 'MMM/yyyy',
  ...rest
}) => {
  const value = _value ? parse(_value, format, new Date()) : undefined;
  const valueOffset = value ? getDiffFromToday(value, granularity) : undefined;

  const [options, setOptions] = React.useState<DateOption[]>([]);

  React.useEffect(() => {
    const upperOffsetThreshold =
      (upperDateThreshold &&
        getDiffFromToday(
          parse(upperDateThreshold, format, new Date()),
          granularity
        )) ||
      _upperOffsetThreshold ||
      offsetThreshold;

    const lowerOffsetThreshold =
      (lowerDateThreshold &&
        getDiffFromToday(
          parse(lowerDateThreshold, format, new Date()),
          granularity
        )) ||
      _lowerOffsetThreshold ||
      offsetThreshold ||
      undefined;

    const initialOffset = valueOffset || 0;

    setOptions(
      getOptionsFromOffset(
        format,
        initialOffset,
        30,
        granularity,
        upperOffsetThreshold,
        lowerOffsetThreshold
      )
    );
  }, [
    valueOffset,
    granularity,
    format,
    setOptions,
    _lowerOffsetThreshold,
    _upperOffsetThreshold,
    lowerDateThreshold,
    upperDateThreshold,
  ]);

  const handleSelect = (offset?: string) => {
    if (offset) {
      onSelect &&
        onSelect(
          formatDate(offsetToDate(parseInt(offset), granularity), format)
        );
    } else onSelect && onSelect(undefined);
  };

  return (
    <Select
      {...rest}
      options={options}
      onSelect={handleSelect}
      value={valueOffset?.toString()}
      type={'single'}
      keyExtractor={option => option.offset.toString()}
      labelExtractor={option => option.formatted}
      flatListProps={{}}
    />
  );
};

export default SelectDate;
