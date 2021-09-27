import React from 'react';
import { Wrapper } from './styled';
import { BorderRadiusType } from '@tecsinapse/react-core';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  animation?: 'pulse' | 'wave';
  radius?: BorderRadiusType;
}

const Skeleton: React.FC<SkeletonProps> = ({
  children,
  width,
  height,
  animation = 'wave',
  radius,
}) => {
  if (!width && !height && !children) {
    throw new Error(
      '[Skeleton] You should provide children or specify width and height'
    );
  }

  return (
    <Wrapper
      width={width}
      height={height}
      animation={animation}
      radius={radius}
    >
      {children}
    </Wrapper>
  );
};

export default Skeleton;
