import React from 'react';
import { mostUsed } from '../../styles/menubar';
import { MostUsedProps } from './types';

const { container, label: labelClass, containerList } = mostUsed();

const MostUsed = ({ label, children, ...rest }: MostUsedProps) => {
  return (
    <div className={container()} data-testid={'most-used-menubar'} {...rest}>
      <p className={labelClass()}>{label}</p>
      <div className={containerList()}>{children}</div>
    </div>
  );
};

export default MostUsed;
