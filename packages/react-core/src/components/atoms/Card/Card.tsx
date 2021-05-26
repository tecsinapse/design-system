import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Paper, PaperProps } from '../Paper';
import { StyledCard } from './styled';

export interface CardProps extends PaperProps {
  onClick?: null | ((event: GestureResponderEvent) => void);
}

const Card: FC<CardProps> = ({
  children,
  style,
  elevated = false,
  onClick,
  ...rest
}): JSX.Element => {
  if (onClick) {
    return (
      <StyledCard {...rest} elevated={elevated} onPress={onClick} style={style}>
        {children}
      </StyledCard>
    );
  }

  return (
    <Paper {...rest} elevated={elevated} style={style}>
      {children}
    </Paper>
  );
};

export default Card;
