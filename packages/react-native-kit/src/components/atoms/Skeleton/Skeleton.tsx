import React, { useState } from 'react';
import { BorderRadiusType } from '@tecsinapse/react-core';
import { Animated, LayoutChangeEvent, View, ViewProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Wrapper } from './styled';
import { Wave } from './Wave';
import { Pulse } from './Pulse';

export interface SkeletonProps extends ViewProps {
  width?: number;
  height?: number;
  radius?: BorderRadiusType;
  active?: boolean;
  animation?: 'wave' | 'pulse';
}

export type ChildrenLayout = {
  width: number;
  height: number;
  x: number;
  y: number;
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Skeleton: React.FC<SkeletonProps> = ({
  children,
  width,
  height,
  radius,
  active = true,
  animation = 'wave',
  ...rest
}) => {
  const [childrenLayout, setChildrenLayout] = useState<ChildrenLayout>({
    width: 0,
    height: 0,
    y: 0,
    x: 0,
  });

  if (!width && !height && !children) {
    throw new Error(
      '[Skeleton] You should provide children or specify width and height'
    );
  }

  const getChildrenLayout = (event: LayoutChangeEvent) => {
    setChildrenLayout(event.nativeEvent.layout);
  };

  return (
    <Wrapper width={width} height={height} radius={radius} {...rest}>
      {active && animation === 'wave' ? (
        <Wave
          active={active}
          width={width}
          height={height}
          childrenLayout={childrenLayout}
        />
      ) : (
        <Pulse
          active={active}
          width={width}
          height={height}
          childrenLayout={childrenLayout}
        />
      )}
      <View
        onLayout={event => getChildrenLayout(event)}
        style={{ opacity: active ? 0 : 1 }}
        pointerEvents={active ? 'none' : 'auto'}
      >
        {children}
      </View>
    </Wrapper>
  );
};

export default Skeleton;
