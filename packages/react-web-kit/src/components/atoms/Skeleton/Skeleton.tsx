import React from 'react';
import { Wrapper } from './styled';
import { BorderRadiusType } from '@tecsinapse/react-core';
import { View } from 'react-native';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  animation?: 'pulse' | 'wave';
  active?: boolean;
  radius?: BorderRadiusType;
}

const Skeleton: React.FC<SkeletonProps> = ({
  children,
  width,
  height,
  animation = 'wave',
  active = true,
  radius,
  ...rest
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
      active={active}
      radius={radius}
      {...rest}
    >
      <View
        style={{ opacity: active ? 0 : 1 }}
        pointerEvents={active ? 'none' : 'auto'}
      >
        {children}
      </View>
    </Wrapper>
  );
};

export default Skeleton;
