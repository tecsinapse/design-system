import { Animated, Easing } from 'react-native';

export const waveAnimation = (
  active: boolean,
  animatedValue: Animated.Value
): void => {
  if (active) {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1600,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: true,
      })
    ).start();
    return;
  }
  Animated.timing(animatedValue, {
    toValue: 0,
    useNativeDriver: true,
  }).start();
};

export const pulseAnimation = (
  active: boolean,
  animatedValue: Animated.Value
): void => {
  if (active) {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
    return;
  }
  Animated.timing(animatedValue, {
    toValue: 0,
    useNativeDriver: true,
  }).start();
};
