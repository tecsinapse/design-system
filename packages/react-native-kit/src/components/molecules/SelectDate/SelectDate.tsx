import * as React from 'react';
import { SelectNativeProps } from '@tecsinapse/react-native-kit';
import { Select } from '../../atoms/Select';
import {
  add,
  differenceInDays,
  differenceInMonths,
  format as formatDate,
  parse,
  set,
} from 'date-fns';
import {
  Dimensions,
  FlatList,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

type DateOption = {
  key: string;
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
  value?: Date;
  onSelect?: (value?: Date) => void | never;
  lowerDateThreshold?: string;
  upperDateThreshold?: string;
  lowerOffsetThreshold?: number;
  upperOffsetThreshold?: number;
  offsetThreshold?: number;
  granularity?: Granularity;
  windowSize?: number;

  /** The Date format. Defaults to MM/YYYY */
  format?: string;
}

function getDiffFromToday(date: Date, granularity: Granularity) {
  const now = new Date();
  const midnight = { hours: 0, minutes: 0, milliseconds: 0 };
  if (granularity === 'days') {
    return differenceInDays(set(date, midnight), set(now, midnight));
  } else if (granularity === 'months') {
    return (
      date.getMonth() -
      now.getMonth() +
      12 * (date.getFullYear() - now.getFullYear())
    );
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
        key: String(offset + unit),
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
  value,
  onSelect,
  offsetThreshold,
  lowerDateThreshold,
  upperDateThreshold,
  lowerOffsetThreshold: _lowerOffsetThreshold,
  upperOffsetThreshold: _upperOffsetThreshold,
  granularity = 'months',
  format = 'MMM/yyyy',
  windowSize = 50,
  ...rest
}) => {
  const flatListRef = React.useRef<FlatList>();

  const valueOffset = value ? getDiffFromToday(value, granularity) : undefined;

  const [options, setOptions] = React.useState<DateOption[]>([]);
  const [windowOffset, setWindowOffset] = React.useState(valueOffset || 0);

  const upperOffsetThreshold =
    (upperDateThreshold &&
      getDiffFromToday(
        parse(upperDateThreshold, format, new Date()),
        granularity
      )) ||
    _upperOffsetThreshold ||
    offsetThreshold ||
    undefined;

  const lowerOffsetThreshold =
    (lowerDateThreshold &&
      getDiffFromToday(
        parse(lowerDateThreshold, format, new Date()),
        granularity
      )) ||
    _lowerOffsetThreshold ||
    offsetThreshold ||
    undefined;

  const calculateOptions = React.useCallback(() => {
    const options = getOptionsFromOffset(
      format,
      windowOffset,
      windowSize,
      granularity,
      upperOffsetThreshold,
      lowerOffsetThreshold
    );

    setOptions(options);
  }, [
    windowOffset,
    value,
    valueOffset,
    granularity,
    format,
    setOptions,
    lowerOffsetThreshold,
    upperOffsetThreshold,
  ]);

  React.useEffect(() => {
    calculateOptions();
  }, [calculateOptions]);

  const handleSelect = (offset?: string) => {
    onSelect?.(
      offset ? offsetToDate(parseInt(offset), granularity) : undefined
    );
    setWindowOffset(offset ? parseInt(offset) : 0);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const y = event.nativeEvent.contentOffset.y;
    const contentSize = event.nativeEvent.contentSize.height;

    if (y === 0) {
      setWindowOffset(offset => {
        const newOffset = offset - windowSize / 2;
        if (lowerOffsetThreshold && newOffset < lowerOffsetThreshold) {
          return offset;
        } else {
          flatListRef?.current?.scrollToIndex({
            index: options.length / 2,
            animated: false,
          });
          return newOffset;
        }
      });
    } else if (y + layoutHeight >= contentSize) {
      setWindowOffset(offset => {
        const newOffset = offset + windowSize / 2;
        if (upperOffsetThreshold && newOffset > upperOffsetThreshold) {
          return offset;
        } else {
          flatListRef?.current?.scrollToIndex({
            index: options.length / 2,
            viewOffset: Dimensions.get('window').height - 150,
            animated: false,
          });
          return newOffset;
        }
      });
    }
  };

  const handleFlatListLayout = () => {
    const index = options.findIndex(({ offset }) => offset === valueOffset);
    flatListRef?.current?.scrollToIndex({
      index: index === -1 ? options.length / 2 : index,
      viewOffset: Dimensions.get('window').height / 2 - 44,
      animated: false,
    });
  };

  const handleBlurUnconfirmed = () => {
    setWindowOffset(valueOffset || 0);
  };

  return (
    <Select
      {...rest}
      options={options}
      onSelect={handleSelect}
      value={valueOffset?.toString()}
      type={'single'}
      keyExtractor={option => option.key}
      onBlurUnconfirmed={handleBlurUnconfirmed}
      hideSearchBar
      customDisplayValue={value ? formatDate(value, format) : undefined}
      labelExtractor={option => option.formatted}
      flatListProps={{
        ref: flatListRef,
        onScroll: handleScroll,
        onLayout: handleFlatListLayout,
        maxToRenderPerBatch: 100,
        windowSize: 100,
        getItemLayout: (item, index) => ({
          //TODO: find out a way to parameterize list item's height
          index: index,
          length: 54.66,
          offset: index * 54.66,
        }),
      }}
    />
  );
};

export default SelectDate;
