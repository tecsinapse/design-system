import React from 'react';
import { DefaultProps } from './types';
import { menubar } from '../../styles/menubar';
import { useDimensions } from '../../hooks';

const { right } = menubar();

const Right = ({ children, ...rest }: DefaultProps) => {
  const { className } = rest;

  return (
    <div
      className={right({ className })}
      data-testid={'header-right-menubar'}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Right;
