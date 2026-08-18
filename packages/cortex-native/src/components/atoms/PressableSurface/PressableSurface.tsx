import React, { ReactNode } from 'react';
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useCSSVariable } from 'uniwind';
import { lightenDarkenColor } from '../../../utils/lightenDarkenColor';

const COLOR_VARIATION_FACTOR = 25;
const SURFACE_COLOR_VAR = '--color-surface-overlay';

export interface PressableSurfaceProps extends PressableProps {
  effect?: 'darken' | 'lighten' | 'none';
  surfaceColor?: string;
  effectIntensity?: number;
  effectStyle?: (pressed: boolean) => StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const PressableSurface = ({
  children,
  surfaceColor,
  effect = 'darken',
  effectIntensity = COLOR_VARIATION_FACTOR,
  effectStyle,
  style,
  ...rest
}: PressableSurfaceProps): React.ReactElement => {
  const surfaceVar = useCSSVariable(SURFACE_COLOR_VAR) as string | undefined;
  const effectBaseColor = surfaceColor ?? surfaceVar ?? '#ffffff';
  const bgColor = surfaceColor ? surfaceColor : 'transparent';

  const readyStyle = (
    state: PressableStateCallbackType,
  ): StyleProp<ViewStyle> => {
    const { pressed } = state;
    const composedStyle: StyleProp<ViewStyle> = [{ backgroundColor: bgColor }, style];

    if (effectStyle) {
      return [composedStyle, effectStyle(pressed)];
    }

    if (effect === 'none') {
      return composedStyle;
    }

    const variation = lightenDarkenColor(
      effectBaseColor,
      effect === 'darken' ? -effectIntensity : effectIntensity,
    );
    return [composedStyle, pressed && { backgroundColor: variation }];
  };

  return (
    <Pressable {...rest} style={readyStyle}>
      {children}
    </Pressable>
  );
};

export default PressableSurface;
