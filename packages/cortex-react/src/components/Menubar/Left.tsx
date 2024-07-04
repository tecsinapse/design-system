import React from 'react';
import { DefaultProps } from './interface';
import { menubar } from './style';
const Left = ({ children, ...rest }: DefaultProps) => {
  const { left } = menubar();
  return (
    <div className={left()} {...rest}>
      {children}
    </div>
  );
};

export default Left;
