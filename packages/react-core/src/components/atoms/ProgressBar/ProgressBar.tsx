import React from 'react';
import { useTheme } from '@emotion/react';
import { Animated, ViewProps } from 'react-native';
import {
  ColorGradationType,
  ColorType,
  ThemeProp,
} from '@tecsinapse/react-core';
import { extractNumbersFromString } from '../../../utils';
import { Container, Progress, Segment } from './styled';

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
  /** Animation (temporarily disabled) */
  animate?: boolean;
  /** Parameters animation  */
  animationParameters?: { direction: 'left' | 'right'; duration: number };
}

const ProgressBar = ({
  segments: _segments = 1,
  valueMin = 0,
  valueNow: _valueNow,
  valueMax = 100,
  color = 'primary',
  colorTone = 'medium',
  animationParameters,
  ...rest
}: ProgressBarProps): JSX.Element => {
  const theme = useTheme() as ThemeProp;
  const animationValue = React.useRef(new Animated.Value(0)).current;
  const animate = false;

  const valueNow =
    typeof _valueNow === 'string'
      ? extractNumbersFromString(_valueNow)
      : _valueNow;

  const totalProgress = ((valueNow - valueMin) / (valueMax - valueMin)) * 100;
  const segments = Math.max(1, _segments);
  const segmentWidth = 100 / Math.max(segments);

  const items = [...Array(segments).keys()];

  const segmentsRender = items.map(index => {
    const max = segmentWidth * (index + 1);
    const min = segmentWidth * index;
    const minmax = (totalProgress - min) / (max - min);
    const width = (minmax > 1 ? 1 : minmax < 0 ? 0 : minmax) * 100;

    let progressPercent:
      | string
      | Animated.AnimatedInterpolation<number | string> = `${width}%`;

    if (animate && animationParameters) {
      Animated.timing(animationValue, {
        toValue: 1,
        duration: animationParameters.duration / items.length,
        useNativeDriver: false,
        delay:
          animationParameters.direction === 'right'
            ? index * (animationParameters.duration / items.length)
            : (items.length - index - 1) *
              (animationParameters.duration / items.length),
      }).start();

      const rangeAnimation =
        animationParameters?.direction === 'right'
          ? [`${valueMin < 0 ? 0 : valueMin}%`, `${width}%`]
          : [`${valueMax}%`, `${width}%`];

      progressPercent = animationValue.interpolate?.({
        inputRange: [0, 1],
        outputRange: rangeAnimation,
      });
    }

    return (
      <Segment
        key={index}
        style={{
          borderRightWidth: index == segments - 1 ? 0 : 2,
        }}
      >
        <Progress
          style={{
            width: progressPercent as any,
            backgroundColor: theme.color[color][colorTone],
            borderRightWidth: width > 0 && width < 100 ? 2 : 0,
          }}
        />
      </Segment>
    );
  });

  return <Container {...rest}>{segmentsRender}</Container>;
};

export default ProgressBar;
