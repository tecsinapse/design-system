import React from 'react';
import { useCSSVariable } from 'uniwind';
import { cn } from '@tecsinapse/cortex-core';
import { Circle, DOT_SVG_CLASS, Svg } from './styled';
import { chartColorVar } from './utils';

export interface DotProps {
  color: string;
  className?: string;
  testID?: string;
}

/** Legend dot marker: 12px circle (legacy iconSize.micro) with a 4px white center hole. */
const Dot: React.FC<DotProps> = ({ color, className, testID }) => {
  const fill = useCSSVariable(chartColorVar(color)) as string | undefined;
  return (
    <Svg
      width={12}
      height={12}
      className={cn(DOT_SVG_CLASS, className)}
      testID={testID}
    >
      <Circle cx={6} cy={6} r={6} fill={fill} />
      {/* white center hole (legacy CircleDot hardcodes #fff) */}
      <Circle cx={6} cy={6} r={2} fill="#ffffff" />
    </Svg>
  );
};

export default Dot;
