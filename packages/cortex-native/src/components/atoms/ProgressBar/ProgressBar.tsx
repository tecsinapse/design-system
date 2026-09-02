import React from 'react';
import { DimensionValue, View, ViewProps } from 'react-native';
import { cn, extractNumbersFromString } from '@tecsinapse/cortex-core';
import { colorToneBg } from '../../../styles/colors';
import type { ColorGradationType, ColorType } from '../../../styles/types';

export interface ProgressBarProps extends ViewProps {
  /** Number of segments. Defaults to 1. Set to 1 when 0 or less */
  segments?: number;
  /** Minimum possible value (0% of the bar). Defaults to 0 */
  valueMin?: number;
  /** Maximum possible value (100% of the bar). Defaults to 100 */
  valueMax?: number;
  /** Current value */
  valueNow: number | string;
  /** Filled partition color. Defaults to 'primary' */
  color?: ColorType;
  /** Filled partition color tone. Defaults to 'medium' */
  colorTone?: ColorGradationType;
}

const ProgressBar = ({
  segments: _segments = 1,
  valueMin = 0,
  valueNow: _valueNow,
  valueMax = 100,
  color = 'primary',
  colorTone = 'medium',
  style,
  className,
  testID,
  ...rest
}: ProgressBarProps): React.ReactElement => {
  const valueNow =
    typeof _valueNow === 'string'
      ? extractNumbersFromString(_valueNow)
      : _valueNow;

  const totalProgress = ((valueNow - valueMin) / (valueMax - valueMin)) * 100;
  const segments = Math.max(1, _segments);
  const segmentWidth = 100 / segments;

  const segmentsRender = [...Array(segments).keys()].map(index => {
    const max = segmentWidth * (index + 1);
    const min = segmentWidth * index;
    const minmax = (totalProgress - min) / (max - min);
    const width = (minmax > 1 ? 1 : minmax < 0 ? 0 : minmax) * 100;

    return (
      <View
        key={index}
        className="flex-1 bg-secondary-light border-secondary-xlight"
        style={{ borderRightWidth: index === segments - 1 ? 0 : 2 }}
      >
        <View
          className={cn('h-full border-secondary-xlight', colorToneBg[color][colorTone])}
          style={{
            width: `${width}%` as DimensionValue,
            borderRightWidth: width > 0 && width < 100 ? 2 : 0,
          }}
        />
      </View>
    );
  });

  return (
    <View
      {...rest}
      testID={testID}
      className={cn('h-mili rounded-mili w-full flex-row overflow-hidden', className)}
      style={style}
    >
      {segmentsRender}
    </View>
  );
};

export default ProgressBar;
