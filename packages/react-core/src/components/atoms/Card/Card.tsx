import React, { FC } from 'react';
import { Paper, PaperProps } from '../Paper';

export type CardProps = Omit<PaperProps, 'disabled'>;

const Card: FC<CardProps> = ({
  children,
  style,
  elevated = false,
  onClick,
  ...rest
}): JSX.Element => (
  <Paper
    {...rest}
    elevated={elevated}
    onClick={onClick}
    disabled={!onClick}
    style={style}
  >
    {children}
  </Paper>
);

export default Card;
