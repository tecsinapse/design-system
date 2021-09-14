import { Animated } from 'react-native';

export const transitionSwitch = (active, transitionValue, animatedColor) => {
  if (active) {
    Animated.timing(transitionValue, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(animatedColor, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.timing(transitionValue, {
      toValue: 16.5,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(animatedColor, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }
};
