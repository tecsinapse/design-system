import { useTheme } from '@emotion/react';
import React, { FC, useCallback } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import {
  ColorGradationType,
  ColorType,
  ThemeProp,
} from '../../../types/defaults';
import { PressableSurface } from '../PressableSurface';
import { StyledSwitch } from './styled';
import { transtionSwitch } from './animation';

export interface SwitchProps {
  onChange: (active: boolean) => void;
  active: boolean;
  activeColor?: ColorType;
  activeColorTone?: ColorGradationType;
  inactiveColor?: ColorType;
  inactiveColorTone?: ColorGradationType;
  style?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
}

const Switch: FC<SwitchProps> = ({
  onChange,
  activeColor = 'primary',
  activeColorTone = 'medium',
  inactiveColor = 'secondary',
  inactiveColorTone = 'light',
  active,
  dotStyle,
  ...rest
}): JSX.Element => {
  const theme = useTheme() as ThemeProp;

  const transitionValue = React.useRef(new Animated.Value(active ? 16.5 : 0))
    .current;

  const animatedColor = React.useRef(new Animated.Value(active ? 1 : 0))
    .current;

  const interpolateColor = animatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [
      theme.color[inactiveColor][inactiveColorTone],
      theme.color[activeColor][activeColorTone],
    ],
  });

  const animatedStyle = {
    backgroundColor: interpolateColor,
  };

  const handleChange = useCallback(() => {
    onChange(!active);
    transtionSwitch(active, transitionValue, interpolateColor);
  }, [active]);

  const stylesDefaut: ViewStyle = {
    borderRadius: 999999,
    paddingHorizontal: 4,
    paddingVertical: 0,
    justifyContent: 'center',
    width: 40,
    height: 22,
  };

  return (
    <PressableSurface {...rest} onPress={handleChange} effect="none">
      <Animated.View style={{ ...animatedStyle, ...stylesDefaut }}>
        <StyledSwitch
          style={[dotStyle, { transform: [{ translateX: transitionValue }] }]}
        />
      </Animated.View>
    </PressableSurface>
  );
};

export default Switch;
