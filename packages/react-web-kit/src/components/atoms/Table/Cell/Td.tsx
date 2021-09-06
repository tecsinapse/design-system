import React from 'react';
import { TCell } from './styled';

const Td: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  ...rest
}) => {
  return <TCell {...rest}>{children}</TCell>;
};

export default Td;
