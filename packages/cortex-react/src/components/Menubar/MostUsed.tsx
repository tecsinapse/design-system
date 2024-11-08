import React from 'react';
import { mostUsed } from '../../styles/menubar';
import { MostUsedProps } from './types';
import { useDimensions } from '../../hooks';

const { container, label: labelClass, containerList } = mostUsed();

const MostUsed = ({ label, children, ...rest }: MostUsedProps) => {
  const { width } = useDimensions();
  if (width <= 640) return <></>;
  return (
    <div className={container()} data-testid={'most-used-menubar'} {...rest}>
      <p className={labelClass()}>{label}</p>
      <div className={containerList()}>{children}</div>
    </div>
  );
};

export default MostUsed;
