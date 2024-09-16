import React from 'react';
import { DefaultProps } from './types';
import { menubar } from '../../styles/menubar';

const { right } = menubar();

const Right = ({ children, ...rest }: DefaultProps) => {
  return (
    <div className={right()} data-testid={'header-right-menubar'} {...rest}>
      {children}
    </div>
  );
};

export default Right;
