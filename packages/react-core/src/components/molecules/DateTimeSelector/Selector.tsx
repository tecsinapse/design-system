import * as React from 'react';

import { SelectorRoot, Control, SelectorValue } from './styled';
import { View, ViewProps } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { Text } from '../../atoms/Text';
import { getDaysInMonth, format } from 'date-fns';

export type Granularity = 'date' | 'month' | 'year' | 'hours' | 'minutes';

interface SelectorProps extends ViewProps {
  granularity: Granularity;
  referenceDate: Date;
  label: string;
  value: number;
  getDisplayValue: (value: number) => string;
  onChange: (value: number) => void | never;
  preventUpper?: boolean;
  preventLower?: boolean;
}

function getPrevAndNext(
  value: number,
  granularity: Granularity,
  daysInMonth: number,
  multiplier = 1
): [number, number] {
  let next = value + multiplier,
    prev = value - multiplier;

  if (granularity === 'date') {
    next = next > daysInMonth ? 1 : next;
    prev = prev < 1 ? daysInMonth : prev;
  } else if (granularity === 'month') {
    next = next > 11 ? 0 : next;
    prev = prev < 0 ? 11 : prev;
  } else if (granularity === 'year') {
    next = next + multiplier;
    prev = prev - multiplier;
  } else if (granularity === 'hours') {
    next = next > 23 ? 0 : next;
    prev = prev < 0 ? 23 : prev;
  } else {
    next = next > 59 ? 0 : next;
    prev = prev < 0 ? 59 : prev;
  }

  return [prev, next];
}
export const Selector: React.FC<SelectorProps> = ({
  granularity,
  label,
  value,
  onChange,
  getDisplayValue,
  referenceDate,
  ...rest
}) => {
  const pressInTimeoutRef = React.useRef<number>();

  // const handlePressPrev = () => {
  //   onChange(prev);
  // };
  //
  // const handlePressNext = () => {
  //   onChange(next);
  // };

  const handlePressInNext = (_next?: number) => {
    const daysInMonth = getDaysInMonth(referenceDate);
    const next = _next || getPrevAndNext(value, granularity, daysInMonth)[1];
    pressInTimeoutRef.current = setTimeout(() => {
      handlePressInNext(getPrevAndNext(next, granularity, daysInMonth, 3)[1]);
    }, 500);
    onChange(next);
  };

  const handlePressInPrev = (_prev?: number) => {
    const daysInMonth = getDaysInMonth(referenceDate);
    const prev = _prev || getPrevAndNext(value, granularity, daysInMonth)[0];
    clearTimeout(pressInTimeoutRef.current);
    onChange(prev);
    pressInTimeoutRef.current = setTimeout(() => {
      handlePressInPrev(getPrevAndNext(prev, granularity, daysInMonth, 3)[0]);
    }, 500);
  };

  const handlePressOut = () => {
    pressInTimeoutRef.current && clearTimeout(pressInTimeoutRef.current);
  };

  return (
    <SelectorRoot {...rest}>
      <Control
        // onPress={handlePressNext}
        onPressIn={() => handlePressInNext()}
        onPressOut={handlePressOut}
      >
        <Icon name={'chevron-up'} type={'material-community'} size={'mega'} />
      </Control>
      <SelectorValue>
        <Text>{label}</Text>
        <Text>{getDisplayValue(value)}</Text>
      </SelectorValue>
      <Control
        onPressIn={() => handlePressInPrev()}
        onPressOut={handlePressOut}
      >
        <Icon name={'chevron-down'} type={'material-community'} size={'mega'} />
      </Control>
    </SelectorRoot>
  );
};
