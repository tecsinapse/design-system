import React from 'react';
import { BadgeStyle } from './styled';
import { ClassNamesProps } from '@emotion/react';

export interface BadgeProps {
  children?: JSX.Element;
  variant: string;
  style: ClassNamesProps;
}

const Badge = ({ children, variant }: BadgeProps): JSX.Element => {
  return <BadgeStyle variant={variant}>{children}</BadgeStyle>;
};

export default Badge;
