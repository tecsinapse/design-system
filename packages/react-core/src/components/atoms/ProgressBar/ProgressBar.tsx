import * as React from 'react';
import { ViewProps } from 'react-native';
import { Container, Progress, Segment } from './styled';
import { useTheme } from '@emotion/react';
import {
  ColorGradationType,
  ColorType,
  ThemeProp,
} from '@tecsinapse/react-core';

export interface ProgressBarProps extends ViewProps {
  /** Number of segments. Defaults to 1 */
  segments?: number;
  /** Minimum possible value (0% of the bar). Defaults to 0 */
  valueMin?: number;
  /** Maximum possible value (100% of the bar). Defaults to 100 */
  valueMax?: number;
  /** Current value */
  valueNow: number;
  /** Filled partition color. Defaults to 'primary' */
  color?: ColorType;
  /** Filled partition color tone. Defaults to 'medium' */
  colorTone?: ColorGradationType;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  segments = 1,
  valueMin = 0,
  valueNow,
  valueMax = 100,
  color = 'primary',
  colorTone = 'medium',
  ...rest
}) => {
  const theme = useTheme() as ThemeProp;
  const totalProgress = ((valueNow - valueMin) / (valueMax - valueMin)) * 100;
  const segmentWidth = 100 / segments;

  const segmentsRender = [...Array(segments).keys()].map(index => {
    const max = segmentWidth * (index + 1);
    const min = segmentWidth * index;
    const minmax = (totalProgress - min) / (max - min);
    const width = (minmax > 1 ? 1 : minmax < 0 ? 0 : minmax) * 100;
    return (
      <Segment
        key={index}
        style={{
          borderRightWidth: index == segments - 1 ? 0 : 2,
        }}
      >
        <Progress
          style={{
            width: `${width}%`,
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
