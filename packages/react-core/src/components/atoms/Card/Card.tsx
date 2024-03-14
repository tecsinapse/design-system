import { PressableSurfaceProps } from '../PressableSurface';
import React, { ReactNode } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Paper, PaperProps } from '../Paper';
import { StyledCard } from './styled';

export interface CardProps
  extends PaperProps,
    Omit<PressableSurfaceProps, 'style'> {
  /** Click handler */
  onPress?: null | ((event: GestureResponderEvent) => void);
  children?: ReactNode;
}

const Card = ({
  children,
  elevated = false,
  onPress,
  ...rest
}: CardProps): JSX.Element => {
  if (onPress) {
    return (
      <StyledCard {...rest} elevated={elevated} onPress={onPress}>
        {children}
      </StyledCard>
    );
  }

  return (
    <Paper {...rest} elevated={elevated}>
      {children}
    </Paper>
  );
};

export default Card;
