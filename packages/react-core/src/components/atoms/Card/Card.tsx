import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Paper, PaperProps } from '../Paper';
import { StyledCard } from './styled';

export interface CardProps extends PaperProps {
  /** Click handler */
  onPress?: null | ((event: GestureResponderEvent) => void);
}

const Card: FC<CardProps> = ({
  children,
  elevated = false,
  onPress,
  ...rest
}): JSX.Element => {
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
