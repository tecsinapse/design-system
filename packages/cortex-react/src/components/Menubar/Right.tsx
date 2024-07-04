import React from 'react';
import { DefaultProps } from './interface';
import { menubar } from './style';

const Right = ({ children, ...rest }: DefaultProps) => {
  const { right } = menubar();
  return (
    <div className={right()} {...rest}>
      {children}
    </div>
  );
};

export default Right;
