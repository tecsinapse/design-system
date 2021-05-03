import React from 'react';
import { ThemeProp } from '@tecsinapse/react-core';
import { BadgeStyle, TextStyle } from './styled';

export interface BadgeProps {
  variant?: string;
  theme?: ThemeProp;
}

const Badge = (props: BadgeProps): JSX.Element => {
  const { variant } = props;
  return (
    <BadgeStyle variant={variant}>
      <TextStyle>Badge</TextStyle>
    </BadgeStyle>
  );
};

export default Badge;
