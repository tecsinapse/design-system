import React from 'react';
import { ClassNamesProps } from '@emotion/react';
import { PaperStyled } from './styled';

export interface PaperProps {
  children?: JSX.Element;
  style?: ClassNamesProps;
}
const Paper = (props: PaperProps): JSX.Element => {
  const { children, style } = props;

  return <PaperStyled style={style}>{children}</PaperStyled>;
};

export default Paper;
