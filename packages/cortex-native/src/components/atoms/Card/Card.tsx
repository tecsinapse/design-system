import PressableSurface, {
  PressableSurfaceProps,
} from '../PressableSurface/PressableSurface';
import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
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

  if (onPress) {
    return (
      <PressableSurface
        {...rest}
        style={style}
        onPress={onPress}
        className={className}
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
