import React from 'react';
import { TRow } from './styled';

const Tr: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  ...rest
}) => {
  return <TRow {...rest}>{children}</TRow>;
};

export default Tr;
