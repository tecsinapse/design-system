import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useCSSVariable } from 'uniwind';
import { lightenDarkenColor } from '../../../utils/lightenDarkenColor';
import type { ColorGradationType, ColorType } from '../../../styles/types';
import { transitionSwitch } from './animation';

export const SWITCH_BODY_WIDTH = 40;
export const SWITCH_PIN_WIDTH = 16;

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
  testID?: string;
}

const Switch: React.FC<SwitchProps> = ({
  onChange,
  activeColor = 'primary',
  activeColorTone = 'medium',
  inactiveColor = 'secondary',
  inactiveColorTone = 'light',
  active,
  dotStyle,
  disabled = false,
  style,
  testID,
  ...rest
}): React.ReactElement => {
  const activeColorVar = useCSSVariable(`--color-${activeColor}-${activeColorTone}`) as string;
  const inactiveColorVar = useCSSVariable(
    `--color-${inactiveColor}-${inactiveColorTone}`,
  ) as string;

  const width = useRef(0);
  const transitionValue = useRef(new Animated.Value(0)).current;
  const animatedColor = useRef(new Animated.Value(0)).current;

  const calculateTranslate = () => {
    if (width.current > 0) {
      return width.current - 4 * 2 - SWITCH_PIN_WIDTH;
    }
    return 0;
  };

  const getBackgroundColor = (color: string) => {
    return disabled
      ? lightenDarkenColor(inactiveColorVar || '#ffffff', 20)
      : color;
  };

  const interpolateColor = animatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [
      getBackgroundColor(inactiveColorVar || '#ffffff'),
      getBackgroundColor(activeColorVar || '#ffffff'),
    ],
  });

  useEffect(() => {
    const translate = calculateTranslate();
    transitionSwitch(active, translate, transitionValue, animatedColor);
  }, [active]);

  const handleChange = useCallback(() => {
    onChange(!active);
  }, [active, onChange]);

  const handleSwitchLayout = (lce: LayoutChangeEvent) => {
    width.current = lce.nativeEvent.layout.width;
    const translate = calculateTranslate();
    transitionSwitch(active, translate, transitionValue, animatedColor);
  };

  return (
    <Pressable
      {...rest}
      onPress={handleChange}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: active, disabled }}
      style={style}
      testID={testID}
    >
      <Animated.View
        onLayout={handleSwitchLayout}
        style={{
          borderRadius: 999,
          paddingHorizontal: 4,
          justifyContent: 'center',
          width: SWITCH_BODY_WIDTH,
          height: 22,
          backgroundColor: interpolateColor,
        }}
      >
        <Animated.View
          style={[
            {
              borderRadius: 999,
              backgroundColor: '#ffffff',
              width: SWITCH_PIN_WIDTH,
              height: SWITCH_PIN_WIDTH,
            },
            dotStyle,
            { transform: [{ translateX: transitionValue }] },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

export default Switch;
