import React, { FC } from 'react';
import { CardStyle } from './styled';
import { StyleProp, ViewStyle } from 'react-native';
import { PaperProps } from '@tecsinapse/react-core';

export interface CardProps extends PaperProps {
  style?: StyleProp<ViewStyle>;
}

const Card: FC<CardProps> = ({ children, style, ...rest }): JSX.Element => (
  <CardStyle {...rest} style={style}>
    {children}
  </CardStyle>
);

export default Card;
