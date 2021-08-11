import React from 'react';
import { THeadStyled } from './styled';

const THead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...rest
}) => {
  return <THeadStyled {...rest}>{children}</THeadStyled>;
};

export default THead;
