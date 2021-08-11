import React from 'react';
import { TBodyStyled } from './styled';

export const TBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...rest
}) => {
  return <TBodyStyled {...rest}>{children}</TBodyStyled>;
};

export default TBody;
