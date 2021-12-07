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
import { transitionSwitch } from './animation';
import { extractNumbersFromString, lightenDarkenColor } from '../../../utils';

export interface SwitchProps {
  onChange: (active: boolean) => void;
  active: boolean;
  activeColor?: ColorType;
  activeColorTone?: ColorGradationType;
  inactiveColor?: ColorType;
  inactiveColorTone?: ColorGradationType;
  style?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const Switch: FC<SwitchProps> = ({
  onChange,
  activeColor = 'primary',
  activeColorTone = 'medium',
  inactiveColor = 'secondary',
  inactiveColorTone = 'light',
  active,
  dotStyle,
  disabled = false,
  ...rest
}): JSX.Element => {
  const theme = useTheme() as ThemeProp;

  const transitionValue = React.useRef(new Animated.Value(active ? 16.5 : 0))
    .current;

  const animatedColor = React.useRef(new Animated.Value(active ? 1 : 0))
    .current;

  const getBackgroundColor = (color: string, variation: number) => {
    return disabled ? lightenDarkenColor(color, variation) : color;
  };

  const interpolateColor = animatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [
      getBackgroundColor(theme.color[inactiveColor][inactiveColorTone], 25),
      getBackgroundColor(theme.color[activeColor][activeColorTone], 50),
    ],
  });

  const animatedStyle = {
    backgroundColor: interpolateColor,
  };

  const handleChange = useCallback(() => {
    onChange(!active);
    transitionSwitch(active, transitionValue, animatedColor);
  }, [active, onChange]);

  const stylesDefault: ViewStyle = {
    borderRadius: extractNumbersFromString(theme.borderRadius.pill),
    paddingHorizontal: extractNumbersFromString(theme.spacing.micro),
    paddingVertical: 0,
    justifyContent: 'center',
    width: 40,
    height: 22,
  };

  return (
    <PressableSurface
      {...rest}
      onPress={handleChange}
      effect="none"
      disabled={disabled}
    >
      <Animated.View style={{ ...animatedStyle, ...stylesDefault }}>
        <StyledSwitch
          style={[dotStyle, { transform: [{ translateX: transitionValue }] }]}
        />
      </Animated.View>
    </PressableSurface>
  );
};

export default Switch;
