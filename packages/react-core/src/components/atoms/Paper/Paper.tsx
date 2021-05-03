import React from 'react';
import { ClassNamesProps } from '@emotion/react';
import { PaperStyled } from './styled';
export interface PaperProps {
  children?: JSX.Element;
  style?: ClassNamesProps;
}
export const Paper = ({ children, style }: PaperProps): JSX.Element => {
  return <PaperStyled style={style}>{children}</PaperStyled>;
};
