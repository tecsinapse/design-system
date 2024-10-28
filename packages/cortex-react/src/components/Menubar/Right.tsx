import React from 'react';
import { DefaultProps } from './types';
import { menubar } from '../../styles/menubar';
import { useDimensions } from '../../hooks';

const { right } = menubar();

const Right = ({ children, ...rest }: DefaultProps) => {
  const { width } = useDimensions();
  if (width <= 640) return <></>;

  return (
    <div className={right()} data-testid={'header-right-menubar'} {...rest}>
      {children}
    </div>
  );
};

export default Right;
