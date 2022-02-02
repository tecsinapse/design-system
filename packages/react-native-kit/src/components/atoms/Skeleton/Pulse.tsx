import { Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { pulseAnimation } from './animation';
import { IAnimationComponent } from './types';

export const Pulse = ({
  active = true,
  width,
  height,
  childrenLayout,
}: IAnimationComponent) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    pulseAnimation(active, animatedValue);
  }, [active]);

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
