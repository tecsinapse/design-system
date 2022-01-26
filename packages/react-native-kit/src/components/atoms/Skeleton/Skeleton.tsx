import React, { useEffect, useRef, useState } from 'react';
import { BorderRadiusType } from '@tecsinapse/react-core';
import { Animated, LayoutChangeEvent, View, ViewProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Wrapper } from './styled';
import { pulseAnimation, waveAnimation } from './animation';

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

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animation === 'wave') waveAnimation(active, animatedValue);
    else pulseAnimation(active, animatedValue);
  }, [active]);

  const range = width ?? childrenLayout.width;

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-range, range],
  });

  const getChildrenLayout = (event: LayoutChangeEvent) => {
    setChildrenLayout(event.nativeEvent.layout);
  };

  const WaveComponent = () => {
    return (
      <AnimatedLinearGradient
        colors={[
          'transparent',
          'rgba(0,0,0,0.05)',
          'rgba(0,0,0,0.1)',
          'transparent',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: width ?? childrenLayout.width,
          height: height ?? childrenLayout.height,
          position: 'absolute',
          top: childrenLayout.y ?? 0,
          left: childrenLayout.x ?? 0,
          zIndex: 2,
          overflow: 'hidden',
          transform: [
            {
              translateX: translateX,
            },
          ],
        }}
      />
    );
  };

  const PulseComponent = () => {
    return (
      <Animated.View
        style={{
          width: width ?? childrenLayout.width,
          height: height ?? childrenLayout.height,
          backgroundColor: 'rgba(0,0,0,0.05)',
          position: 'absolute',
          top: childrenLayout.x ?? 0,
          left: childrenLayout.y ?? 0,
          zIndex: 2,
          overflow: 'hidden',
          opacity: animatedValue,
        }}
      />
    );
  };

  return (
    <Wrapper width={width} height={height} radius={radius} {...rest}>
      {active && animation === 'wave' ? <WaveComponent /> : <PulseComponent />}
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
