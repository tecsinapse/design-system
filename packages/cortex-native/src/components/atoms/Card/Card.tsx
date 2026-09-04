import PressableSurface, {
  PressableSurfaceProps,
} from '../PressableSurface/PressableSurface';
import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { useCSSVariable } from 'uniwind';
import { clsx } from 'clsx';
import Paper, { PaperProps } from '../Paper/Paper';

export interface CardProps
  extends PaperProps,
    Omit<PressableSurfaceProps, 'style'> {
  /** Click handler */
  onPress?: null | ((event: GestureResponderEvent) => void);
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const cardBaseClass = 'bg-surface-overlay rounded-mili';

const Card = ({
  children,
  elevated = false,
  onPress,
  style,
  ...rest
}: CardProps): React.ReactElement => {
  const className = clsx(cardBaseClass, elevated && 'shadow-default');
  // Resolve the theme surface so the interactive Card paints its background via
  // PressableSurface's inline style. RN inline `style` overrides uniwind
  // className-based backgrounds (the legacy emotion stack routed the same color
  // through `style`, which is why this used to work); the className stays on
  // for utility consistency (radius, etc.).
  const surfaceColor = useCSSVariable('--color-surface-overlay') as
    | string
    | undefined;

  if (onPress) {
    return (
      <PressableSurface
        {...rest}
        style={style}
        onPress={onPress}
        className={className}
        surfaceColor={surfaceColor}
      >
        {children}
      </PressableSurface>
    );
  }

  return (
    <Paper style={style} elevated={elevated}>
      {children}
    </Paper>
  );
};

export default Card;
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export type { HeaderProps } from './Header';
export type { FooterProps } from './Footer';
