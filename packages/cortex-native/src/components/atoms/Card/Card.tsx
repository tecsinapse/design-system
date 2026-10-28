import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

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
  // The surface is painted via `composed`'s className; PressableSurface derives
  // its own press-effect base color from its own `--color-surface-overlay` lookup.

  if (onPress) {
    return (
      <PressableSurface
        {...rest}
        style={style}
        onPress={onPress}
        className={composed}
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
