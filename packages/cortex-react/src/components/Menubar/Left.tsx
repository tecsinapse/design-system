import React from 'react';
import { DefaultProps } from './types';
import { menubar } from '../../styles/menubar';
import { useDimensions } from '../../hooks';

const { left } = menubar();

const Left = ({ children, ...rest }: DefaultProps) => {
  const { width } = useDimensions();
  if (width <= 640) return <></>;
  return (
    <div className={left()} data-testid={'header-left-menubar'} {...rest}>
      {children}
    </div>
  );
};

export default Left;
