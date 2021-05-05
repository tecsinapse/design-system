import React, { FC } from 'react';
import { CardStyle } from './styled';
import { StyleProp, ViewProps } from 'react-native';

export interface CardProps {
  children?: JSX.Element;
  style?: StyleProp<ViewProps>;
}

const Card: FC<CardProps> = ({ children, style }): JSX.Element => {
  return <CardStyle style={style}>{children}</CardStyle>;
};

export default Card;
