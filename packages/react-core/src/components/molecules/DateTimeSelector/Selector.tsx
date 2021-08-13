import { getDaysInMonth } from 'date-fns';
import * as React from 'react';
import { ViewProps } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { TextProps } from '../../atoms/Text';
import { Control, SelectorRoot, SelectorValue } from './styled';

export type Granularity = 'date' | 'month' | 'year' | 'hours' | 'minutes';

interface SelectorProps extends ViewProps {
  TextComponent: React.FC<TextProps>;
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
  } else if (granularity === 'hours') {
    next = next > 23 ? 0 : next;
    prev = prev < 0 ? 23 : prev;
  } else if (granularity === 'minutes') {
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
  preventUpper,
  preventLower,
  TextComponent,
  ...rest
}) => {
  const pressInTimeoutRef = React.useRef<number>();

  const handlePressInNext = (_next?: number) => {
    const daysInMonth = getDaysInMonth(referenceDate);
    const next = _next || getPrevAndNext(value, granularity, daysInMonth)[1];
    clearTimeout(pressInTimeoutRef.current);
    pressInTimeoutRef.current = setTimeout(() => {
      handlePressInNext(getPrevAndNext(next, granularity, daysInMonth, 3)[1]);
    }, 500);
    onChange(next);
  };

  const handlePressInPrev = (_prev?: number) => {
    const daysInMonth = getDaysInMonth(referenceDate);
    const prev = _prev || getPrevAndNext(value, granularity, daysInMonth)[0];
    clearTimeout(pressInTimeoutRef.current);
    pressInTimeoutRef.current = setTimeout(() => {
      handlePressInPrev(getPrevAndNext(prev, granularity, daysInMonth, 3)[0]);
    }, 500);
    onChange(prev);
  };

  const handlePressOut = () => {
    pressInTimeoutRef.current && clearTimeout(pressInTimeoutRef.current);
  };

  return (
    <SelectorRoot {...rest}>
      <Control
        onPressIn={() => handlePressInNext()}
        onPressOut={handlePressOut}
        disabled={preventUpper}
        style={{ opacity: preventUpper ? 0 : 1 }}
      >
        <Icon
          name={'chevron-up'}
          type={'material-community'}
          size={'mega'}
          colorVariant={'primary'}
        />
      </Control>
      <SelectorValue>
        <TextComponent colorVariant={'secondary'} typography={'sub'}>
          {label}
        </TextComponent>
        <TextComponent fontWeight={'bold'} typography={'h5'}>
          {getDisplayValue(value)}
        </TextComponent>
      </SelectorValue>
      <Control
        onPressIn={() => handlePressInPrev()}
        onPressOut={handlePressOut}
        disabled={preventLower}
        style={{ opacity: preventLower ? 0 : 1 }}
      >
        <Icon
          name={'chevron-down'}
          type={'material-community'}
          size={'mega'}
          colorVariant={'primary'}
        />
      </Control>
    </SelectorRoot>
  );
};
