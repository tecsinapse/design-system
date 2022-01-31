import React from 'react';
import { TableStyled } from './styled';

export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({
  children,
  ...rest
}) => {
  return <TableStyled {...rest}>{children}</TableStyled>;
};

export default Table;
