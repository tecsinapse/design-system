import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import { useCSSVariable } from 'uniwind';

import Paper, { PaperProps } from '../Paper/Paper';
import PressableSurface, {
  PressableSurfaceProps,
} from '../PressableSurface/PressableSurface';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

export interface CardProps
  extends PaperProps,
    Omit<PressableSurfaceProps, 'style'> {
  /** Click handler */
  onPress?: null | ((event: GestureResponderEvent) => void);
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const cardBaseClass = 'bg-surface-overlay rounded-mili';

const CardRoot = ({
  children,
  elevated = false,
  onPress,
  className,
  style,
  ...rest
}: CardProps): React.ReactElement => {
  const composed = cn(cardBaseClass, elevated && 'shadow-default', className);
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
        className={composed}
        surfaceColor={surfaceColor}
      >
        {children}
      </PressableSurface>
    );
  }

  return (
    <Paper {...rest} className={composed} style={style} elevated={elevated}>
      {children}
    </Paper>
  );
};

CardRoot.displayName = 'Card';

const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header,
  Body,
  Footer,
});

export default Card;
export { default as Header } from './Header';
export { default as Body } from './Body';
export { default as Footer } from './Footer';
export type { HeaderProps } from './Header';
export type { BodyProps } from './Body';
export type { FooterProps } from './Footer';
