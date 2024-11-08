import React from 'react';
import { DefaultProps } from './types';
import { menubar } from '../../styles/menubar';

const { left } = menubar();

const Left = ({ children, ...rest }: DefaultProps) => {
  const { className } = rest;
  return (
    <div
      className={left({ className })}
      data-testid={'header-left-menubar'}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Left;
