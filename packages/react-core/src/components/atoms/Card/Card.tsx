import React from 'react';
import { CardStyle } from './styled';
import { ClassNamesProps } from '@emotion/react';

export interface CardProps {
  children?: JSX.Element;
  style?: ClassNamesProps;
}

const Card = (props: CardProps): JSX.Element => {
  const { children, style } = props;
  return <CardStyle style={style}>{children}</CardStyle>;
};

export default Card;
