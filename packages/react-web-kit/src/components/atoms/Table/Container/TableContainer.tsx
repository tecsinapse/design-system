import React from 'react';
import { TContainer } from './styled';

const TableContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return <TContainer {...rest}>{children}</TContainer>;
};

export default TableContainer;
