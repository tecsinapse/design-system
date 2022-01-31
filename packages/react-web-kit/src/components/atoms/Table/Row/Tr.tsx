import React from 'react';
import { TRow } from './styled';

export const Tr: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  ...rest
}) => {
  return <TRow {...rest}>{children}</TRow>;
};

export default Tr;
