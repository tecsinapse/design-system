import { lightenDarkenColor } from '@tecsinapse/react-native-kit';
import React, { FC } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

const COLOR_VARIATION_FACTOR = 13;

export interface PressableSurfaceProps extends PressableProps {
  effect?: 'darken' | 'lighten' | 'none';
  effectStyle?: (pressed: boolean) => StyleProp<ViewStyle>;
}

const PressableSurface: FC<PressableSurfaceProps> = ({ children, ...rest }) => {
  const allProps = prepareProps(rest);
  return <Pressable {...allProps}>{children}</Pressable>;
};

const findBackgoundColor = (styles: any) => {
  const colors = styles
    .flat()
    .map((individualStyle: ViewStyle) => individualStyle?.backgroundColor)
    .filter(style => !!style);
  return colors.slice(-1)[0] || '#ffffff';
};

const prepareProps = ({
  effect = 'darken',
  effectStyle,
  ...others
}: PressableSurfaceProps): PressableSurfaceProps => {
  const color = findBackgoundColor(others.style);
  const lighten = lightenDarkenColor(color, COLOR_VARIATION_FACTOR);
  const darken = lightenDarkenColor(color, -COLOR_VARIATION_FACTOR);

  switch (effect) {
    case 'darken':
      return {
        ...others,
        style: ({ pressed }) => [
          others.style as any,
          effectStyle
            ? effectStyle(pressed)
            : pressed && { backgroundColor: darken },
        ],
      };

    case 'lighten':
      return {
        ...others,
        style: ({ pressed }) => [
          others.style as any,
          effectStyle
            ? effectStyle(pressed)
            : pressed && { backgroundColor: lighten },
        ],
      };

    case 'none':
      return others;
  }
};

export default PressableSurface;
