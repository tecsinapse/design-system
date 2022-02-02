import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { waveAnimation } from './animation';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const Wave = ({ active, width, height, childrenLayout }) => {
  const range = width ?? childrenLayout.width;
  const animatedValue = useRef(new Animated.Value(0)).current;

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-range, range],
  });

  useEffect(() => {
    waveAnimation(active, animatedValue);
  }, [active]);

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
