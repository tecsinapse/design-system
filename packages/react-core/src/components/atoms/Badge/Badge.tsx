import React from 'react';
import { BadgeStyle } from './styled';
import { ClassNamesProps } from '@emotion/react';

export interface BadgeProps {
  children?: JSX.Element;
  variant: string;
  style?: ClassNamesProps;
}

const Badge = (props: BadgeProps): JSX.Element => {
  const { children, variant, style } = props;
  return (
    <BadgeStyle style={style} variant={variant}>
      {children}
    </BadgeStyle>
  );
};

export default Badge;
