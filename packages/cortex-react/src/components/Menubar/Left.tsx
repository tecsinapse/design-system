import React from 'react';
import { DefaultProps } from './interface';
import { menubar } from '../../styles/menubar';

const Left = ({ children, ...rest }: DefaultProps) => {
  const { left } = menubar();
  return (
    <div className={left()} data-testid={'header-left-menubar'} {...rest}>
      {children}
    </div>
  );
};

export default Left;
