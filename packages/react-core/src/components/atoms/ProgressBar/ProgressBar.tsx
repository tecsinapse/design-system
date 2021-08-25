import * as React from 'react';
import { Animated, ViewProps, Text } from 'react-native';
import { Container, Progress, Segment } from './styled';
import { useTheme } from '@emotion/react';
import {
  ColorGradationType,
  ColorType,
  ThemeProp,
} from '@tecsinapse/react-core';

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
  /** Animation */
  animate: boolean;
  /** Parameters animation  */
  animationParameters?: { direction: 'left' | 'right'; duration: number };
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  segments: _segments = 1,
  valueMin = 0,
  valueNow: _valueNow,
  valueMax = 100,
  color = 'primary',
  colorTone = 'medium',
  animate,
  animationParameters,
  ...rest
}) => {
  const theme = useTheme() as ThemeProp;

  const valueNow =
    typeof _valueNow === 'string'
      ? parseInt(_valueNow.replace(/\D/g, ''))
      : _valueNow;

  const totalProgress = ((valueNow - valueMin) / (valueMax - valueMin)) * 100;
  const segments = Math.max(1, _segments);
  const segmentWidth = 100 / Math.max(segments);

  const items = [...Array(segments).keys()];

  const segmentsRender = items.map(index => {
    const animationValue = React.useRef(new Animated.Value(0)).current;

    const max = segmentWidth * (index + 1);
    const min = segmentWidth * index;
    const minmax = (totalProgress - min) / (max - min);
    const width = (minmax > 1 ? 1 : minmax < 0 ? 0 : minmax) * 100;

    const delayAnimation =
      animationParameters?.direction === 'left'
        ? (items.length - index - 1) *
          (animationParameters.duration / items.length)
        : index * (animationParameters.duration / items.length);

    if (animate && animationParameters) {
      Animated.timing(animationValue, {
        toValue: 1,
        duration: animationParameters.duration / items.length,
        useNativeDriver: true,
        // delay: index * (animationParameters.duration / items.length), // funciona =>
        delay: delayAnimation,
      }).start();
    }
    const rangeAnimation =
      animationParameters?.direction === 'left'
        ? [`${valueMax}%`, `${width}%`]
        : [`${valueMin}%`, `${width}%`];
    const progressPercent = animationValue.interpolate?.({
      inputRange: [0, 1],
      outputRange: rangeAnimation,
    });

    return (
      <Segment
        key={index}
        style={{
          borderRightWidth: index == segments - 1 ? 0 : 2,
        }}
      >
        <Progress
          style={{
            width: animate ? progressPercent : `${width}%`,
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
