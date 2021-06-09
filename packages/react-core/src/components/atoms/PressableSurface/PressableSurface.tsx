import React, { FC } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

const FACTOR = 0.75;
const SCALE = 0.96;

export interface PressableSurfaceProps extends PressableProps {
  effect?: 'opacity' | 'highlight' | 'none';
  effectStyle?: (pressed: boolean) => StyleProp<ViewStyle>;
}

const PressableSurface: FC<PressableSurfaceProps> = ({ children, ...rest }) => {
  const allProps = prepareProps(rest);
  return <Pressable {...allProps}>{children}</Pressable>;
};

const prepareProps = ({
  effect = 'opacity',
  effectStyle,
  ...others
}: PressableSurfaceProps): PressableSurfaceProps => {
  switch (effect) {
    case 'opacity':
      return {
        ...others,
        style: ({ pressed }) => [
          others.style as any,
          effectStyle
            ? effectStyle(pressed)
            : { opacity: pressed ? 1 * FACTOR : 1 },
        ],
      };

    case 'highlight':
      return {
        ...others,
        style: ({ pressed }) => [
          others.style as any,
          effectStyle
            ? effectStyle(pressed)
            : { transform: [{ scale: pressed ? SCALE : 1 }] },
        ],
      };

    case 'none':
      return others;
  }
};

export default PressableSurface;
