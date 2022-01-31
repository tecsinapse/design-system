import React from 'react';
import { ThStyled } from './styled';

export const Th: React.FC<
  React.ThHTMLAttributes<HTMLTableHeaderCellElement>
> = ({ children, ...rest }) => {
  return <ThStyled {...rest}>{children}</ThStyled>;
};

export default Th;
